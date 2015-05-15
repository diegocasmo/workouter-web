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
  'views/view_workout/workout_view',
  'views/view_workout/delete_workout_view',
  'views/elements/bottom_menu_view',
  'helpers/flash_message_helper',
  'lang/en_locale'
], function($, _, Backbone, BaseManager, WorkoutsCollection,
          CloseViewWorkoutView, WorkoutView, DeleteWorkoutView,
          BottomMenuView, FlashMessage, enLocale) {

  'use strict';

  var ViewWorkoutManager = BaseManager.extend({

    el: $('#app-wrapper'),


    buildChildViews: function(options) {
      // workoutId has already been update for this
      // view on app_router

      // scroll to top
      window.scrollTo(0, 0);

      this.workoutsCollection = new WorkoutsCollection();

      // initialize child views
      this.closeViewWorkoutView = new CloseViewWorkoutView(options);
      this.bottomMenuView = new BottomMenuView(options);

      // make sure workout is passed to WorkoutView
      options.workoutModel = this.getSingleWorkout();
      this.workoutView = new WorkoutView(options);
      this.deleteWorkoutView = new DeleteWorkoutView(options);

      this.listenTo(this.deleteWorkoutView, 'workout:delete',
        this.deleteWorkoutFromCollection);

      // save child views
      this.childViews.push(this.bottomMenuView);
      this.childViews.push(this.closeViewWorkoutView);
      this.childViews.push(this.workoutView);
      this.childViews.push(this.deleteWorkoutView);

      // if no workout is found, then redirect to workouts
      // after childViews have been properly set up
      if(!options.workoutModel) {
        this.redirectToWorkouts();
        return;
      }

      this.render();
    },

    render: function() {
      // this.$el.append(this.closeViewWorkoutView.render().el);
      this.$el.append(this.workoutView.render().el);
      this.$el.append(this.deleteWorkoutView.render().el);
      this.$el.append(this.bottomMenuView.render().el);
      return this;
    },

    /**
     * get workout according to workoutId passed
     * by URL on router
     */
    getSingleWorkout: function() {
      return this.workoutsCollection.getWorkout(this.workoutId);
    },

    deleteWorkoutFromCollection: function() {
      var workoutTitle =
        this.workoutsCollection.getWorkout(this.workoutId).getWorkoutTitle();

      var message = workoutTitle + enLocale.flashMessage.workoutDelete;
      FlashMessage.showSuccess(message);
      this.workoutsCollection.removeWorkout(this.workoutId);
      this.redirectToWorkouts();
    },

    redirectToWorkouts: function() {
      this.router.navigate('workouts', { trigger: true });
    }

  });

  return ViewWorkoutManager;

});