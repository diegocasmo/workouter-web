// Base app router

define([
  'jquery',
  'backbone',
], function($, Backbone) {

  'use strict';

  var BaseRouter = Backbone.Router.extend({

    activeManager: null,

    // Removes active manager if any
    _removeActiveManager: function() {
      if(this.activeManager) {
        this.activeManager.remove();
        this.activeManager = null;
      }
    },

    // Returns true if a route is private,
    // false otherwise
    _isRoutePrivate: function(route) {
      return (this.publicRoutes.indexOf(route) > -1) ? false : true;
    },

  });

  return BaseRouter;
});
