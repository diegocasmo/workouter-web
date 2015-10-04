// View manager to render a single workout

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'views/elements/go_back_view',
  'views/view_workout/workout_view',
  'views/view_workout/delete_workout_view',
  'views/elements/bottom_menu_view',
  'helpers/flash_message_helper',
  'lang/en_locale'
], function($, _, Backbone, BaseManager, GoBackView,
          WorkoutView, DeleteWorkoutView, BottomMenuView,
          FlashMessage, enLocale) {

  'use strict';

  var ViewWorkoutManager = BaseManager.extend({

    template: _.template(
      '<div id="go-back-view"></div>' +
      '<div id="workout-view"></div>' +
      '<div id="delete-workout-view"></div>' +
      '<div class="bottom-menu"></div>'
    ),

    initializeManager: function(options) {
      this.workoutsCollection = options.workoutsCollection;
      this.workoutModel       = options.workoutModel;
      this.render();
      this.renderGoBackView(options);
      this.renderWorkoutView(options);
      this.renderDeleteWorkoutView(options);
      this.renderBottomMenuView(options);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    deleteWorkoutFromCollection: function() {
      var workoutTitle = this.workoutModel.getWorkoutTitle(),
          message = workoutTitle + enLocale.flashMessage.workoutDelete;
      FlashMessage.showSuccess(message);
      this.workoutsCollection.removeWorkout(this.workoutModel);
      this.redirectToWorkouts();
    },

    // Renders go back view
    renderGoBackView: function(options) {
      var goBackView = new GoBackView(options);
      this.childViews.push(goBackView);
      this.$el.find('#go-back-view')
        .append(goBackView.render().el);
    },

    // Renders bottom menu view
    renderBottomMenuView: function(options) {
      var bottomMenuView = new BottomMenuView(options);
      this.childViews.push(bottomMenuView);
      this.$el.find('.bottom-menu')
        .append(bottomMenuView.render().el);
    },

    // Renders delete workout view
    renderDeleteWorkoutView: function(options) {
      var deleteWorkoutView = new DeleteWorkoutView(options);
      this.listenTo(deleteWorkoutView, 'workout:delete',
        this.deleteWorkoutFromCollection);
      this.childViews.push(deleteWorkoutView);
      this.$el.find('#delete-workout-view')
        .append(deleteWorkoutView.render().el);
    },

    // Renders workout view
    renderWorkoutView: function(options) {
      var workoutView = new WorkoutView(options);
      this.childViews.push(workoutView);
      this.$el.find('#workout-view')
        .append(workoutView.render().el);
    },

    redirectToWorkouts: function() {
      this.router.navigate('workouts', { trigger: true });
    }

  });

  return ViewWorkoutManager;

});
