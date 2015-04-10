/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render profile view
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager'
], function($, _, Backbone, BaseManager) {

  'use strict';

  var AddWorkoutManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      this.render();
    },

    render: function() {
      return this;
    }

  });

  return AddWorkoutManager;

});