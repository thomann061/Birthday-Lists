var express = require('express');
var router = express.Router();

//function to handle page requests
const renderPage = (route, page) => {
	router.get(route, (req, res) => {
		res.render(page, { title: 'Birthday Lists' });
	});
};

/* GET home page. */
renderPage('/', 'index');
renderPage('/index', 'index');

const mongoose = require('mongoose');
const listSchema = require('../schemas/lists');

/**
 * API For a List
 */

/* POST or save a List */
router.post('/api/save', (req, res) => {
	const List = mongoose.model('List', listSchema);
	const newList = new List({
		ListName: 'Birthday List #1',
		ListId: 1,
		ListItems: [ { ItemName: 'Transformers Toy' },
					{ ItemName: 'Cool Robot' } ]
	});
	newList.save((err, data) => {
		if(err) console.log(err);
		else console.log('Saved: ', data);
	});
});

module.exports = router;