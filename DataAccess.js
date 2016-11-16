const mongoose = require('mongoose');
//connect to mongodb
mongoose.connect('mongodb://localhost/data');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	const kittySchema = mongoose.Schema({
		name: String
	});
	const Kitten = mongoose.model('Kitten', kittySchema);
	const silence = new Kitten({ name: 'Silence' });
	console.log(silence.name);
});

module.exports = db;