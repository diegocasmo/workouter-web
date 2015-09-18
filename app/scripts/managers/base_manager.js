// Base manager to extend from.

define([
  'jquery',
  'underscore',
  'backbone',
  'services/auth_service'
], function($, _, Backbone) {

  'use strict';

  var BaseManager = Backbone.View.extend({

    $body: $('body'),

    el: $('#app-wrapper'),

    childViews: [],

    initialize: function(options) {
      var that = this;
      this.options = options;
      this.router = options.router;
      this.eventTrigger = options.eventTrigger;
      this.listenTo(this.router, this.eventTrigger, function() {
        that.prepareManager(options);
        that.initializeManager(options);
      });
    },

    // execute common functionality before
    // building child views
    prepareManager: function(options) {
      window.scrollTo(0, 0);
      this.$body.addClass(options.managerClass);
    },

    initializeManager: function(options) {},

    // overwrite remove method in order to clean
    // html and not delete view's $el
    remove: function() {
      this.destroyChildViews();
      this.$body.removeClass();
      this.$el.html('');
      this.stopListening();
      return this;
    },

    // destroys all child views
    destroyChildViews: function() {
      _.each(this.childViews, function(childView) {
        childView.remove();
      });
      this.childViews = [];
    }

  });

  return BaseManager;

});
