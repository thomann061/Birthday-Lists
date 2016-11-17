var express = require('express');
var router = express.Router();

//function to handle page requests
const renderPage = (route, page) => {
	router.get(route, (req, res) => {
		res.render(page, { title: 'Birthday List Manager' });
	});
};

/* GET home page. */
renderPage('/', 'index');
renderPage('/index', 'index');

module.exports = router;
