const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Item = schema({
	Item: String
});

const user = schema({
	DisplayName: { type: String, required: true },
	Username: { type: String, required: true, unique: true, minlength: 3, match: /^[a-zA-Z0-9_-]*$/ },
	Password: { type: String, required: true, minlength: 3 },
	Lists: [
		{
			ListName: { type: String, minlength: 3, maxlength: 100 },
			ListItems: [ Item ]
		}
	]
});

module.exports = user;