var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const listSchema = require('../schemas/lists');

//function to handle page requests
const renderPage = (route, page) => {
	router.get(route, (req, res) => {
		res.render(page, { title: 'Birthday Lists' });
	});
};

/* GET home page. */
renderPage('/', 'index');
renderPage('/index', 'index');

/**
 * API For a List
 */

function response(message) {
	return {
		"message": message
	}
}

/* POST or save a List */
router.post('/api/save', (req, res) => {
	const listJSON = req.body;
	const List = mongoose.model('List', listSchema);
	const newList = new List(listJSON);
	newList.save((err, data) => {
		if(err)
			res.json(response("error"));
		else
			res.json(response("success"));
	});
});

module.exports = router;