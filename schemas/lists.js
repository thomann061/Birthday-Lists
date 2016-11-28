const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Item = schema({
	Item: String
});

const list = schema({
	User: {
		DisplayName: { type: String, required: true },
		Username: { type: String, required: true, unique: true, minlength: 3, match: /[A-Za-z0-9\-\_]+/ },
		Password: { type: String, required: true, minlength: 3 },
		Lists: [
			{
				ListName: { type: String, required: true, minlength: 3, maxlength: 100 },
				ListItems: [ Item ],
				ID: String
			}
		]
	}

});

module.exports = list;