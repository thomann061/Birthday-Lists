var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const userSchema = require('../schemas/users');
const bcrypt = require('bcrypt');

//function to handle page requests
const renderPage = (route, page, title) => {
	router.get(route, (req, res) => {
		res.render(page, { title });
	});
};

/* Render pages */
renderPage('/register', 'user/register', 'Register');
renderPage('/edit*', 'user/edit', 'Edit User');
renderPage('/login', 'user/login', 'Login');

/**
 * API For Logging a User in
 */

function response(result, data, message) {
	return {
		'result': result,
		'data': data,
		'message': message
	};
}

/* Register a User */
router.post('/api/', (req, res) => {
	const listJSON = req.body;
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(listJSON.Password, salt);
	listJSON.Password = hash;
	delete listJSON['ConfirmPassword'];
	const User = mongoose.model('User', userSchema);
	const newList = new User(listJSON);
	newList.save((err, data) => {
		if(err) {
			if(err.code == 11000)
				res.json(response('error', '', 'Username exists.  Please choose a different one.'));
			else
				res.json(response('error', '', 'There was an error registering your account. Sorry.'));
		}
		else
			res.json(response('success', '', 'You have been registered!'));
	});
});

/* Login a User */
router.post('/api/login', (req, res) => {
	const json = req.body;
	const User = mongoose.model('User', userSchema);

	User.findOne({ Username: json.Username }, (err, data) => {
		if(err)
			res.json(response('error', '', 'Username or password may be wrong.'));
		else {
			if(data == null)
				res.json(response('error', '', 'Username or password may be wrong.'));
			else {
				if(bcrypt.compareSync(json.Password, data.Password)) {
					//set userID to the session
					req.session.UserID = data._id;
					res.json(response('success', '', 'User was logged in.'));
				} else
					res.json(response('error', '', 'Username or password may be wrong.'));
			}
		}
	});
});

/* GET a User For Editing */
router.get('/api/', (req, res) => {
	if(req.session.UserID === undefined)
		res.json(response('error', '', 'Please login first.'));
	else {
		const User = mongoose.model('User', userSchema);
		User.findOne({ _id: req.session.UserID }, (err, jsonObject) => {
			if(err)
				res.json(response('error', '', 'An error occurred.'));
			else {
				//only send what is needed
				res.json(response('success', { DisplayName: jsonObject.DisplayName,
					_id: jsonObject._id }, ''));
			}
		});
	}
});

/* Edit a User's DisplayName and Password */
router.put('/api/:id', (req, res) => {
	//double check if passwords match
	if(req.body.Password !== req.body.ConfirmPassword)
		res.json(response('error', '', 'Could not update the user.'));
	else {
		//hash password
		const jsonObject = req.body;
		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(jsonObject.Password, salt);
		jsonObject.Password = hash;
		const User = mongoose.model('User', userSchema);
		User.findOneAndUpdate({ _id: req.params.id }, { DisplayName: jsonObject.DisplayName, Password: jsonObject.Password }, (err, data) => {
			if(err)
				res.json(response('error', '', 'Could not update the user.'));
			else
				res.json(response('success', '', 'User has been updated.'));
		});
	}
});

module.exports = router;