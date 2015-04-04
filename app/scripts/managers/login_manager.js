/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render login view
 */

define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  'use strict';

  var LoginManager = Backbone.View.extend({

    initialize: function(options) {
      this.router = options.router;
      this.listenTo(this.router, 'login_manager:show', this.buildLoginPage);
    },

    buildLoginPage: function() {
      console.log('buildLoginPage');
    }

  });

  return LoginManager;
});