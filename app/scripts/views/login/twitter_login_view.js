// Twitter login button view

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'services/auth_service',
  'helpers/flash_message_helper',
  'lang/en_locale'
], function($, _, Backbone, AuthService, FlashMessage, enLocale) {

  'use strict';

  var TwitterLoginView = Backbone.View.extend({

    template: _.template(
      '<button id="twitter-login"><%= twitterLoginButton.text %></button>'
      ),

    className: 'twitter-login-view',

    events: {
      'click button#twitter-login': 'login'
    },

    initialize: function(options) {
      this.router = options.router;
      this.userModel = options.userModel;
      this.bindViewEvents();
    },

    render: function() {
      this.$el.html(this.template(enLocale.login.twitterLoginView));
      return this;
    },

    // Binds view events which respond to user actions
    bindViewEvents: function() {
      var that = this;
      this.listenTo(this, 'login:error', this.redirectToLogin);
      this.listenTo(this, 'login:success', function(userAttrs) {
        if (that.userModel.setTwitterUser(userAttrs)) {
          FlashMessage.showSuccess(enLocale.flashMessage.loginSuccess);
          that.redirectToWorkouts();
        } else {
          FlashMessage.showError(enLocale.flashMessage.loginError);
          that.trigger('login:error');
        }
      });
    },

    login: function(event) {
      event.preventDefault();
      var that = this;
      AuthService.attemptTologUserIn(function(data) {
        if (data.error) {
          FlashMessage.showError(enLocale.flashMessage.loginError);
          that.trigger('login:error');
        } else {
          that.trigger('login:success', data.authData);
        }
      });
    },

    redirectToLogin: function() {
      this.router.navigate('login', { trigger: true });
    },

    redirectToWorkouts: function() {
      this.router.navigate('workouts', { trigger: true });
    }

  });

  return TwitterLoginView;
});
