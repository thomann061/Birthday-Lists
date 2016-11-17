const mongoose = require('mongoose');
const schema = mongoose.Schema;

const list = schema({
	ListName: { type: String, required: true, minlength: 3, maxlength: 100 },
	ListItems: [ String ]
});

module.exports = list;