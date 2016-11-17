const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimiter = require('express-limiter');
//var favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const csurf = require('csurf');

const appController = require('./app_start/appController');
const schemaStart = require('./app_start/schemaStart');
const mongoose = require('mongoose');

const app = express();

//rate limiter
rateLimiter(app);
const sixty = 60;
const thousand = 1000;
const hundred = 100;
rateLimiter({
	lookup: [ 'connection.remoteAddress' ],
	total: hundred,
	expire: thousand * sixty * sixty
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(csurf());
app.use(express.static(path.join(__dirname, 'public')));

Promise.resolve()
.then(() => {
	return new Promise((resolve, reject) => {
		mongoose.connect('mongodb://localhost/data');
		const db = mongoose.connection;
		db.on('error', (...args) => {
			console.error('conneciton error: ', ...args);
			reject('Could not open database connection');
		});
		db.once('open', () => {
			resolve();
		});
	});
})
.then(() => schemaStart(app))
.then(() => appController(app))
.then(() => {
	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use((err, req, res, next) => {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
})
.catch(err => {
	console.error(err);
	process.exit(1);
});

module.exports = app;