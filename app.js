"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');

/*this is the url that holds DB connect information
this was removed from this version since it holds username and password*/

//var configDB = require('./config/database.js');

var app = express();

//mongoose setup
// normally without quotes, but since the file is removed we use this.

//mongoose.connect(configDB.url);

require('./config/passport')(passport); //setup passport in passport.js, we pass the created passport.

// view engine setup. we use pug in this project
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parsers, debugging
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport setup
app.use(session({ secret: 'somesessionsecretrighthurr' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routes
require('./routes/routes.js')(app, passport); //pass app and passport to routes

//serving files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
