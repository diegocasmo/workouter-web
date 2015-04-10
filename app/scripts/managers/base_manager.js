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
        this.buildChildViews(options);
      });
    },

    buildChildViews: function(options) {},

    destroy: function() {
      if(this.childViews.length > 0) {
        _.each(this.childViews, function(childView) {
          childView.remove();
        });
      this.childViews = [];
      }
    },

    remove: function() {
      Backbone.View.prototype.remove.call(this);
    }

  });

  return BaseManager;
});