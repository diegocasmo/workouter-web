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
  'services/auth_service'
  ], function ($, _, Backbone, JST, enLocale, AuthService) {

    'use strict';

    var LoginMainView = Backbone.View.extend({

      template: JST['app/scripts/templates/login/login_main_view_template.hbs'],

      tagName: 'div',

      attributes: { id: 'login-main-view' },

      events: {
        'click .twitter-login': 'loginWithTwitter'
      },

      initialize: function (options) {
        this.router = options.router;
        this.listenTo(this, 'login:error', this.redirectToLogin);
        this.listenTo(this, 'login:success', this.redirectToWorkouts);
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
            that.trigger('login:success');
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