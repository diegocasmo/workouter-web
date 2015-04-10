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
  'templates',
  'lang/en_locale',
  'services/auth_service',
  'models/user_model'
  ], function ($, _, Backbone, JST, enLocale, AuthService, UserModel) {

  'use strict';

  var LoginMainView = Backbone.View.extend({

    template: JST['app/scripts/templates/login/login_main_view_template.hbs'],

    tagName: 'div',

    attributes: { id: 'login-main-view' },

    events: {
      'click .twitter-login': 'loginWithTwitter'
    },

    initialize: function (options) {
      var that = this;
      this.router = options.router;

      this.userModel = UserModel.getInstance();

      this.listenTo(this, 'login:error', this.redirectToLogin);
      this.listenTo(this, 'login:success', function(userData) {
        if(that.userModel.setTwitterUser(userData)) {
          // if successful redirect to workouts
          that.redirectToWorkouts();
        } else {
          // if error, then trigger "login:error"
          that.trigger('login:error');
        }
      });
    },

    render: function () {
      this.$el.html(this.template(enLocale.login.loginMainView));
      return this;
    },

    loginWithTwitter: function(event) {
      event.preventDefault();
      var that = this;
      AuthService.attemptTologUserIn(function(data) {
        if(data.error) {
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

  return LoginMainView;
});