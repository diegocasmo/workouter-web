/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the main login view.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'lang/en_locale',
  'services/auth_service',
  'models/user_model',
  'helpers/flash_message_helper'
], function($, _, Backbone, Handlebars, enLocale, AuthService,
          UserModel, FlashMessage) {

  'use strict';

  var TwitterLoginView = Backbone.View.extend({

    template: Handlebars.compile(
      '<button id="twitter-login">{{ twitterLoginButton.text }}</button>'
      ),

    tagName: 'div',

    attributes: {
      class: 'twitter-login-view'
    },

    events: {
      'click button#twitter-login': 'login'
    },

    initialize: function(options) {
      var that = this;
      this.router = options.router;
      this.userModel = UserModel.getInstance();
      // events setup
      this.listenTo(this, 'login:error', this.redirectToLogin);
      this.listenTo(this, 'login:success', function(userData) {
        if (that.userModel.setTwitterUser(userData)) {
          var message = enLocale.flashMessage.loginSuccess;
          FlashMessage.showSuccess(message);
          // if successful redirect to workouts
          that.redirectToWorkouts();
        } else {
          var message = enLocale.flashMessage.loginError;
          FlashMessage.showError(message);
          // if error, then trigger "login:error"
          that.trigger('login:error');
        }
      });
    },

    render: function() {
      this.$el.html(this.template(enLocale.login.twitterLoginView));
      return this;
    },

    login: function(event) {
      event.preventDefault();
      var that = this;
      AuthService.attemptTologUserIn(function(data) {
        if (data.error) {
          var message = enLocale.flashMessage.loginError;
          FlashMessage.showError(message);
          that.trigger('login:error');
        } else {
          that.trigger('login:success', data.authData);
        }
      });
    },

    redirectToLogin: function() {
      this.router.navigate('login', {
        trigger: true
      });
    },

    redirectToWorkouts: function() {
      this.router.navigate('workouts', {
        trigger: true
      });
    }

  });

  return TwitterLoginView;
});
