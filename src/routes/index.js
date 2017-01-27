/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

import React from 'react';
import ReactDom from 'react-dom/server';
import {
  match
}
from 'react-router';
import {
  Provider
}
from 'react-redux';
import {
  ReduxAsyncConnect,
  loadOnServer
}
from 'redux-connect';
import configureStore from '../redux/configureStore';
import renderHTML from '../helpers/render_html';
import Routes from '../routes.jsx';

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var hvuRoutes = require('./API/routes/index');

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '';

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.jwtMiddleware);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
  reduxRoutes: Routes,
};

// Setup Route Bindings
exports = module.exports = function(app) {


  // Load API routes
  hvuRoutes(app);

  app.use((req, res, next) => {
    const store = configureStore();

    const state = store.getState();

    // This setting is required for material-ui server-side rendering
    state.theme.userAgent = req.headers['user-agent'];

    match({
      routes: routes.reduxRoutes,
      location: req.url
    }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      }

      if (error) {
        return next({
          message: error.message,
          status: 500,
          success: false
        });
      }

      if (!renderProps) {
        return next({
          message: 'Not found',
          status: 404,
          success: false
        });
      }

      loadOnServer({...renderProps,
        store
      }).then(() => {
        const componentHTML = ReactDom.renderToString(
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );
        res.send(renderHTML(componentHTML, store.getState(), assetUrl));
      });
    });
  });

  app.use(function(error, req, res, next) {
    res.status(error.status).send({
      message: error.message,
      success: false,
    });
  });

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);

};
