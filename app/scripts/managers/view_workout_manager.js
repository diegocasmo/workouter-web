/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render view workout views
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'views/view_workout/close_view_workout_view'
], function($, _, Backbone, BaseManager, CloseViewWorkoutView) {

  'use strict';

  var ViewWorkoutManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      this.workoutId = options.workoutId;

      // initialize child views
      this.closeViewWorkoutView = new CloseViewWorkoutView(options);

      // save child views
      this.childViews.push(this.closeViewWorkoutView);

      this.render();
    },

    render: function() {
      this.$el.append(this.closeViewWorkoutView.render().el);
      return this;
    }

  });

  return ViewWorkoutManager;

});