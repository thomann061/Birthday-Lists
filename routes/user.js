var express = require('express');
var router = express.Router();

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

/* POST or create a User */
router.post('/api/', (req, res) => {
	const listJSON = req.body;
	const List = mongoose.model('List', listSchema);
	const newList = new List(listJSON);
	newList.save((err, data) => {
		if(err)
			res.json(response('error', '', 'User was not saved.'));
		else
			res.json(response('success', '', 'User was saved.'));
	});
});

/* GET a User */
router.get('/api/:id', (req, res) => {
	const List = mongoose.model('List', listSchema);
	List.find({ ID: req.params.id }, (err, data) => {
		if(err)
			res.json(response('error', '', 'Could not get the user by that id.'));
		else
			res.json(response('success', data, ''));
	});
});

/* Edit a User */
router.put('/api/:id', (req, res) => {
	const List = mongoose.model('List', listSchema);
	List.findOneAndUpdate({ ID: req.params.id }, req.body, (err, data) => {
		if(err)
			res.json(response('error', '', 'Could not update the user.'));
		else
			res.json(response('success', '', 'User was updated.'));
	});
});

module.exports = router;