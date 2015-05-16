/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the main close add workout view.
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

  var goBackView = Backbone.View.extend({

    template: JST['app/scripts/templates/elements/go_back_view.hbs'],

    tagName: 'div',

    attributes: {
      id: 'go-back-view'
    },

    events: {
      'click i.fa-chevron-left': 'close'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.goBackView));
      return this;
    },

    close: function(event) {
      event.preventDefault();
      this.router.navigateToPreviousRoute();
    }

  });

  return goBackView;

});
