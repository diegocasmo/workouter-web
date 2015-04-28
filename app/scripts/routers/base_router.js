/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Base app router
 */

define([
  'jquery',
  'backbone',
], function($, Backbone) {

  'use strict';

  var BaseRouter = Backbone.Router.extend({

    initialize: function() {
      this.on('route', this.storeRoute);
      this.history = [];
    },

    storeRoute: function() {
      this.history.push(Backbone.history.fragment);
    },

    previousRoute: function() {
      if (this.history.length > 1) {
        this.navigate(this.history[this.history.length - 2], { trigger: true });
      } else {
        this.navigate('', { trigger: true });
      }
    }

  });

  return BaseRouter;
});