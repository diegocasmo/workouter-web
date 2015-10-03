// A view to redirect the user back to the previous route.

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone) {

  'use strict';

  var GoBackView = Backbone.View.extend({

    template: _.template(
      '<i class="fa fa-chevron-left"></i>'
      ),

    className: 'go-back-view',

    events: {
      'click i.fa-chevron-left': 'goBack'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    goBack: function(event) {
      event.preventDefault();
      window.history.back();
    }

  });

  return GoBackView;

});
