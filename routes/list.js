var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const userSchema = require('../schemas/users');

//function to handle page requests
const renderPage = (route, page, title) => {
	router.get(route, (req, res) => {
		res.render(page, { title });
	});
};

/* GET home page. */
renderPage('/', 'list/index', 'Your Lists');
renderPage('/index', 'list/index', 'Your Lists');
renderPage('/create', 'list/create', 'Create List');
renderPage('/edit*', 'list/edit', 'Edit List');

/**
 * API For a List
 */

function response(result, data, message) {
	return {
		'result': result,
		'data': data,
		'message': message
	};
}

/* POST or save a List */
router.post('/api/', (req, res) => {
	//make sure user is logged in
	if(req.session.UserID === undefined)
		res.json(response('error', '', 'Please login first.'));
	else {
		const User = mongoose.model('User', userSchema);
		User.findOneAndUpdate({ _id: req.session.UserID }, { $push: { Lists: req.body } }, (err, data) => {
			if(err)
				res.json(response('error', data, 'Could not create the list.'));
			else
				res.json(response('success', '', 'List was created.'));
		});
	}
});

/* GET all Lists From a User */
router.get('/api/', (req, res) => {
	//make sure user is logged in
	if(req.session.UserID === undefined)
		res.json(response('error', '', 'Please login first.'));
	else {
		const User = mongoose.model('User', userSchema);
		User.findOne({ _id: req.session.UserID }, (err, data) => {
			if(err)
				res.json(response('error', '', 'Could not get the lists.'));
			else {
				if(data.Lists.length == 0)
					res.json(response('error', '', 'Create your first list!'));
				else
					res.json(response('success', data.Lists, 'You have lists.'));
			}
		});
	}
});

/* GET one List */
router.get('/api/:id', (req, res) => {
	//make sure user is logged in
	if(req.session.UserID === undefined)
		res.json(response('error', '', 'Please login first.'));
	else {
		const User = mongoose.model('User', userSchema);
		User.findOne({ 'Lists._id': req.params.id }, (err, data) => {
			if(err)
				res.json(response('error', '', 'Could not get the list by that id.'));
			else {
				let doc = {};
				data.Lists.forEach((list) => {
					if(list._id == req.params.id)
						doc = list;
				});
				res.json(response('success', doc, ''));
			}
		});
	}
});

/* Edit one List */
router.put('/api/:id', (req, res) => {
	//make sure user is logged in
	if(req.session.UserID === undefined)
		res.json(response('error', '', 'Please login first.'));
	else {
		const User = mongoose.model('User', userSchema);
		User.findOneAndUpdate({ 'Lists._id': req.params.id }, { $set: { 'Lists.$': req.body } }, (err, data) => {
			if(err)
				res.json(response('error', '', 'Could not update the list.'));
			else
				res.json(response('success', data, 'List was updated.'));
		});
	}
});

/* Delete one List */
router.delete('/api/:id', (req, res) => {
	//make sure user is logged in
	if(req.session.UserID === undefined)
		res.json(response('error', '', 'Please login first.'));
	else {
		const User = mongoose.model('User', userSchema);
		User.findOneAndUpdate({ 'Lists._id': req.params.id }, {
			$pull: { Lists: { _id: req.params.id } } }, (err, data) => {
				if(err)
					res.json(response('error', '', 'Could not delete the list.'));
				else {
					res.json(response('success', '', 'List was deleted.'));
				}
			});
	}
});

module.exports = router;