/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the add workout button.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'lang/en_locale'
], function($, _, Backbone, JST, enLocale) {

  'use strict';

  var LoginAppLogoView = Backbone.View.extend({

    template: JST['app/scripts/templates/elements/login_app_logo_view.hbs'],

    tagName: 'div',

    attributes: {
      class: 'login-app-logo-view'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.LoginAppLogoView));
      return this;
    }

  });

  return LoginAppLogoView;

});
