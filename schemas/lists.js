const mongoose = require('mongoose');
const schema = mongoose.Schema;

const list = schema({
	ListName: { type: String, required: true, minlength: 3, maxlength: 100 },
	ListId: { type: Number, required: true, match: /^\d+$/ },
	ListItems: [ { ItemName: { type: String, required: true, minlength: 3, maxlength: 50 } } ]
});

module.exports = list;