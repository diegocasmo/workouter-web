// View manager to render login view

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'views/login/twitter_login_view'
], function($, _, Backbone, BaseManager, TwitterLoginView) {

  'use strict';

  var LoginManager = BaseManager.extend({

    template: _.template(
      '<div class="login-app-logo-view">' +
        '<div class="workouter-letter-logo"></div>' +
      '</div>'
      ),

    initializeManager: function(options) {
      this.render();
      this.renderTwitterLoginView(options)
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    // Renders twitter login button
    renderTwitterLoginView: function(options) {
      var twitterLoginView = new TwitterLoginView(options);
      this.childViews.push(twitterLoginView);
      this.$el.append(twitterLoginView.render().el);
    }

  });

  return LoginManager;

});
