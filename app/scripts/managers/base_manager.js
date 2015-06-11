/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Base manager to extend from.
 */

define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  'use strict';

  var BaseManager = Backbone.View.extend({

    childViews: [],

    initialize: function(options) {
      var that = this;
      this.router = options.router;
      this.eventTrigger = options.eventTrigger;
      this.listenTo(this.router, this.eventTrigger, function() {
        that.buildChildViews(options);
      });
    },

    buildChildViews: function(options) {},

    remove: function() {
      this.destroyChildViews();
      this.$el.html('');
      this.undelegateEvents();
    },

    destroyChildViews: function() {
      _.each(this.childViews, function(childView) {
        childView.remove();
      });
      this.childViews = [];
    }

  });

  return BaseManager;

});