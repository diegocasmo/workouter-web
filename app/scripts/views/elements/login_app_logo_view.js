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
  'lang/en_locale'
], function($, _, Backbone, enLocale) {

  'use strict';

  var LoginAppLogoView = Backbone.View.extend({

    template: _.template(
      '<div class="workouter-letter-logo"></div>'
      ),

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
