var express = require('express');
var router = express.Router();

//function to handle page requests
const renderPage = (route, page, title) => {
	router.get(route, (req, res) => {
		res.render(page, { title });
	});
};

/* Render pages */
renderPage('/register', 'user/register', 'Register');
renderPage('/edit*', 'user/edit', 'Edit User');
renderPage('/login', 'user/login', 'Login');

module.exports = router;