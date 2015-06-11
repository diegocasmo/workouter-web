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

    history: [],

    activeLayout: null,

    $body: $('body'),

    initialize: function() {
      this.on('route', this.storeRoute);
    },

    storeRoute: function() {
      this.history.push(Backbone.history.fragment);
    },

    navigateToPreviousRoute: function() {
      if (this.history.length > 1) {
        this.navigate(
          this.history[this.history.length - 2],
          { trigger: true }
        );
      } else {
        this.navigate('', { trigger: true });
      }
    }

  });

  return BaseRouter;
});