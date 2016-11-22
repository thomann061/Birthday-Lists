const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Item = schema({
	Item: String
});

const list = schema({
	ListName: { type: String, required: true, minlength: 3, maxlength: 100 },
	ListItems: [ Item ],
	ID: String
});

module.exports = list;