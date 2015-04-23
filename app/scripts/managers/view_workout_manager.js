/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render view workout views
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager'
], function($, _, Backbone, BaseManager) {

  'use strict';

  var ViewWorkoutManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      this.workoutId = options.workoutId;
      this.render();
    },

    render: function() {
      return this;
    }

  });

  return ViewWorkoutManager;

});