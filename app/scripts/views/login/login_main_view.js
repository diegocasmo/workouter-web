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
  'lang/en_locale'
  ], function ($, _, Backbone, JST, enLocale) {

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
      },

      render: function () {
        this.$el.html(this.template(enLocale.login.loginMainView));
        return this;
      },

      loginWithTwitter: function(event) {
        event.preventDefault();
      }

    });

    return LoginMainView;
  });