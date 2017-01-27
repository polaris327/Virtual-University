// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Requires
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation. 

keystone.init({
	'name': 'hvu',
	'brand': 'hvu',
	'mongo': 'mongodb://test1:test1@ds139448.mlab.com:39448/hvu',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.png',
	'views': 'templates/views',
	'view engine': 'jade',

	's3 config': {
		bucket: 'hvu',
		key: 'AKIAJ5CQKS2HHNRM24HQ',
		secret: 'Ybmvqp2dD+ClV6CalZud72LOL9N2oyLJnfuwKQId'
	},

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'Admin',
});

// Load your project's Models
keystone.import('models');

// Load routes
var Routes = require('./routes/index');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Set routes
keystone.set('routes', Routes);

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	admins: 'admins',
	users: 'users',
	courses: 'courses',
	chapters: 'chapters',
	quizzes: ['quizzes', 'questions'],
	files: 'files',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
