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
  'collections/workouts_collection',
  'views/view_workout/close_view_workout_view',
  'views/view_workout/workout_view'
], function($, _, Backbone, BaseManager, WorkoutsCollection,
          CloseViewWorkoutView, WorkoutView) {

  'use strict';

  var ViewWorkoutManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      // initialize child views
      this.closeViewWorkoutView = new CloseViewWorkoutView(options);

      // make sure workout is passed to WorkoutView
      options.workoutModel = this.getSingleWorkout();
      this.workoutView = new WorkoutView(options);

      // save child views
      this.childViews.push(this.closeViewWorkoutView);
      this.childViews.push(this.workoutView);

      // if no workout is found, then redirect to workouts
      // after childViews have been properly set up
      if(!options.workoutModel) {
        this.router.navigate('workouts', { trigger: true });
        return;
      }

      this.render();
    },

    render: function() {
      this.$el.append(this.closeViewWorkoutView.render().el);
      this.$el.append(this.workoutView.render().el);
      return this;
    },

    /**
     * get workout according to workoutId passed
     * by URL on router
     */
    getSingleWorkout: function() {
      var workoutsCollection = new WorkoutsCollection();
      return workoutsCollection.get(this.workoutId);
    }

  });

  return ViewWorkoutManager;

});