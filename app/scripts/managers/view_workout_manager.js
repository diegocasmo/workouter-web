// View manager to render a single workout

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'collections/workouts_collection',
  'views/elements/go_back_view',
  'views/view_workout/workout_view',
  'views/view_workout/delete_workout_view',
  'views/elements/bottom_menu_view',
  'helpers/flash_message_helper',
  'lang/en_locale'
], function($, _, Backbone, BaseManager, WorkoutsCollection,
          GoBackView, WorkoutView, DeleteWorkoutView,
          BottomMenuView, FlashMessage, enLocale) {

  'use strict';

  var ViewWorkoutManager = BaseManager.extend({

    initializeManager: function(options) {
      this.workoutsCollection = new WorkoutsCollection();

      // initialize child views
      this.goBackView = new GoBackView(options);
      this.bottomMenuView = new BottomMenuView(options);

      // make sure workout is passed to WorkoutView
      options.workoutModel = this.getSingleWorkout(options.workoutId);
      this.workoutView = new WorkoutView(options);
      this.deleteWorkoutView = new DeleteWorkoutView(options);

      this.listenTo(this.deleteWorkoutView, 'workout:delete',
        this.deleteWorkoutFromCollection);

      // save child views
      this.childViews.push(this.goBackView);
      this.childViews.push(this.bottomMenuView);
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
      this.$el.append(this.goBackView.render().el);
      this.$el.append(this.workoutView.render().el);
      this.$el.append(this.deleteWorkoutView.render().el);
      this.$el.append(this.bottomMenuView.render().el);
      return this;
    },

    // Get workout according to workoutId
    getSingleWorkout: function(workoutId) {
      return this.workoutsCollection.getWorkout(workoutId);
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
