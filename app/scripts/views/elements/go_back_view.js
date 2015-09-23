// A view to redirect the user back to the previous route.

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'lang/en_locale'
], function($, _, Backbone, enLocale) {

  'use strict';

  var GoBackView = Backbone.View.extend({

    template: _.template(
      '<i class="fa fa-chevron-left"></i>'
      ),

    className: 'go-back-view',

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

  return GoBackView;

});
