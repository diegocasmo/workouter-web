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
      this.eventName = options.eventName;
      this.listenTo(this.router, this.eventName, function() {
        that.prepareManager(options);
        that.initializeManager(options);
      });
    },

    // Execute common functionality before
    // building child views
    prepareManager: function(options) {
      window.scrollTo(0, 0);
      this.$body.addClass(options.managerClass);
    },

    // Initializes manager logic
    initializeManager: function(options) {},

    // Overwrite remove method in order to clean
    // HTML and not remove view's $el
    remove: function() {
      this.destroyChildViews();
      this.$body.removeClass();
      this.$el.html('');
      this.stopListening();
      return this;
    },

    // Destroys all child views
    destroyChildViews: function() {
      _.each(this.childViews, function(childView) {
        childView.remove();
      });
      this.childViews = [];
    }

  });

  return BaseManager;

});
