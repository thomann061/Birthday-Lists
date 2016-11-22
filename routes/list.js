var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const listSchema = require('../schemas/lists');

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
	const listJSON = req.body;
	const List = mongoose.model('List', listSchema);
	const newList = new List(listJSON);
	newList.save((err, data) => {
		if(err)
			res.json(response('error', '', 'Record was not saved.'));
		else
			res.json(response('success', '', 'Record was saved.'));
	});
});

/* GET all Lists */
router.get('/api/', (req, res) => {
	const List = mongoose.model('List', listSchema);
	List.find({}, (err, data) => {
		if(err)
			res.json(response('error', '', 'Could not get the lists.'));
		else
			res.json(response('success', data, ''));
	});
});

/* GET one List */
router.get('/api/:id', (req, res) => {
	const List = mongoose.model('List', listSchema);
	List.find({ ID: req.params.id }, (err, data) => {
		if(err)
			res.json(response('error', '', 'Could not get the list by that id.'));
		else
			res.json(response('success', data, ''));
	});
});

/* PUT one List */
router.put('/api/:id', (req, res) => {
	const List = mongoose.model('List', listSchema);
	List.findOneAndUpdate({ ID: req.params.id }, req.body, (err, data) => {
		if(err)
			res.json(response('error', '', 'Could not update the list.'));
		else
			res.json(response('success', '', 'List was updated.'));
	});
});

/* DELETE one List */
router.delete('/api/:id', (req, res) => {
	const List = mongoose.model('List', listSchema);
	List.remove({ ID: req.params.id }, (err, data) => {
		if(err)
			res.json(response('error', '', 'Could not delete the list.'));
		else
			res.json(response('success', '', 'List was deleted.'));
	});
});

module.exports = router;