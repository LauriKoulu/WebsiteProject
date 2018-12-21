"use strict";

module.exports = function(app, passport) {
	/* GET home page. */
	app.get('/', function(req, res) {
	  res.render('index', { user: req.user });
	});

	/* GET login form */
	app.get('/login', function(req, res) {
		res.render('login', { message: req.flash('loginMessage'), title: 'Login'});
	});

	/* POST login form */
	app.post('/login', passport.authenticate('local-login', {
		// on success redirect to home page since we dont have a profile page.
		successRedirect : '/',
		// on failure redirect to where they were
		failureRedirect : '/login',
		failureFlash : true //allow passing flash messages
	}));

	/* GET register form */
	app.get('/signup', function(req, res) {
	  res.render('signup', { title: 'Create account' , message: req.flash('signupMessage')});
	});

	/* POST signup form */		
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	// statistics page render when we call /statistics route
	app.get('/statistics', function(req, res) {
		res.render('stats', { title: 'Statistics'});
	});

	/* get LOGOUT */
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/*twitter authentication. this path doesn't really do anything
	for us right now since twitter wants https connection to work */
	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/signup'
		}));

	//facebook authentication
	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope: ['public_profile', 'email'],
	}));

	//facebook callback
	app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/signup'
        }));

	//logout for user
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/'); //redirect user to home page after logging out
	});


};

// middleware route
function isLoggedIn(req, res, next) {
	//if user authenticated, allow next
	if (req.isAuthenticated()) {
		return next();
	}

	// if not authenticated, redirect
	res.redirect('/');
}