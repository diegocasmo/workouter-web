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

    initialize: function(options) {
      this.router = options.router;
      this.eventTrigger = options.eventTrigger;
      this.listenTo(this.router, this.eventTrigger, this.render);
    },

    destroy: function() {},

    remove: function() {
      Backbone.View.prototype.remove.call(this);
    },

    render: function() {}

  });

  return BaseManager;
});