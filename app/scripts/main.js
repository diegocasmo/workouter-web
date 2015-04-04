/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Main entry point and configuration
 *              of the application
 */
/*global require, Firebase*/
'use strict';
require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    foundation: '../../bower_components/foundation/js/foundation.min',
    handlebars: '../bower_components/handlebars/handlebars.min',
    localstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
    firebase: '../bower_components/firebase/firebase',
    backbonefire: '../bower_components/backbonefire/dist/backbonefire',
    'jquery.cookie': '../bower_components/jquery.cookie/jquery.cookie'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    foundation: {
      deps: ['jquery']
    },
    localstorage: {
      deps: ['backbone']
    },
    backbonefire: {
      deps: ['firebase', 'backbone']
    },
    'jquery.cookie': {
      deps: ['jquery']
    }
  }
});

require([
  'jquery',
  'backbone',
  'services/firebase_service',
  'services/auth_service',
  'foundation'
], function ($, Backbone, FirebaseService, AuthService) {

  $(document).foundation();

  Backbone.history.start({
      pushState: false,
      root: '/'
    });

  var ref = new Firebase(FirebaseService.url);

  $('#log-out').click(function(e) {
    e.preventDefault();
    if(AuthService.isLoggedIn()) {
      AuthService.logUserOut();
      window.location.reload();
    } else {
      console.log('User is already logged out.\n');
    }
  });

  $('#log-in').click(function(e) {
    e.preventDefault();
    if (AuthService.isLoggedIn()) {
      console.log('User is logged in');
    } else {
      console.log('User is logged out.\n');
      AuthService.attemptTologUserIn(function(data) {
        if(!data.error) {
          console.log('Authenticated successfully with payload:', data.authData);
        } else {
          console.log('Unable to authenticate.\n')
        }
      });
    }
  });

  console.log('Current Auth Status: ' + AuthService.isLoggedIn());

});