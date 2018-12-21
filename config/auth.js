"use strict";

// some of the info was removed on purpose and wont work as is.
module.exports = {
	'twitterAuth': {
		'consumerKey': 'consumerkey',
		'consumerSecret': 'consumersecret',
		'callbackURL': 'http://localhost:3000/auth/twitter/callback'
	},

	'facebookAuth': {
		'clientID': 'id',
		'clientSecret': 'clientsecret',
		'callbackURL': 'http://localhost:3000/auth/facebook/callback',
		'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
		'profileFields' : ['id', 'email', 'name']
	}
};