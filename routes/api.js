const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const listSchema = require('../schemas/lists');

/* POST or save a List */
router.post('/save', (req, res) => {
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
