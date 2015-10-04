// Base app router

define([
  'jquery',
  'backbone',
], function($, Backbone) {

  'use strict';

  var BaseRouter = Backbone.Router.extend({

    history: [],

    activeManager: null,

    // Removes active manager if any
    removeActiveManager: function() {
      if(this.activeManager) {
        this.activeManager.remove();
        this.activeManager = null;
      }
    }

  });

  return BaseRouter;
});
