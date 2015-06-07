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
  'lang/en_locale'
], function($, _, Backbone, enLocale) {

  'use strict';

  var goBackView = Backbone.View.extend({

    template: _.template(
      '<i class="fa fa-chevron-left"></i>'
      ),

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
