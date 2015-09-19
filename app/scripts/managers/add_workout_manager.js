// View manager to render profile view

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'views/elements/go_back_view',
  'views/add_workout/workout_form_view',
  'views/add_workout/exercises_form_view',
  'views/add_workout/add_workout_form_view',
  'helpers/flash_message_helper',
  'lang/en_locale'
], function($, _, Backbone, BaseManager, GoBackView,
            WorkoutFormView, ExercisesFormView, AddWorkoutFormView,
            FlashMessage, enLocale) {

  'use strict';

  var AddWorkoutManager = BaseManager.extend({

    template: _.template(
      '<div id="go-back-view"></div>' +
      '<div id="workout-form-view"></div>' +
      '<div id="exercises-form-view"></div>' +
      '<div id="add-workout-view"></div>'
    ),

    // Override 'remove' from 'BaseManager'
    // in order to destroy models and collections
    remove: function() {
      this.exercisesCollection.removeAllExercises();
      BaseManager.prototype.remove.call(this);
    },

    initializeManager: function(options) {
      this.userModel            = options.userModel;
      this.workoutModel         = options.workoutModel;
      this.exerciseModel        = options.exerciseModel;
      this.exercisesCollection  = options.exercisesCollection;
      this.workoutsCollection   = options.workoutsCollection;
      // Make sure current user is assign as the
      // workout's owner
      this.assignWorkoutToUser();
      this.render();
      this.renderGoBackView(options);
      this.renderWorkoutFormView(options);
      this.renderExerciseFormView(options);
      this.renderAddWorkoutFormView(options);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    assignWorkoutToUser: function() {
      this.workoutModel.assignCurrentUser(this.userModel.toJSON());
    },

    addExerciseToCollection: function() {
      this.exercisesCollection.addExercise(this.exerciseModel.toJSON());
      var message = this.exerciseModel.getExerciseTitle() +
        enLocale.flashMessage.exerciseAdded;
      FlashMessage.showSuccess(message);
      this.exerciseModel.resetExercise();
    },

    addWorkoutToCollection: function() {
      var exercisesCollection = this.exercisesCollection.toJSON(),
          workout = this.workoutModel.createWorkout(exercisesCollection);
      // Add workout to collection if valid
      if(workout) {
        this.workoutsCollection.addWorkout(workout);
        var message = workout.getWorkoutTitle() +
          enLocale.flashMessage.workoutAdded;
        FlashMessage.showSuccess(message);
        this.router.navigate('workouts', { trigger: true });
      } else {
        var message = enLocale.flashMessage.workoutError;
        FlashMessage.showError(message);
      }
    },

    // Renders go back view
    renderGoBackView: function(options) {
      var goBackView = new GoBackView(options);
      this.childViews.push(goBackView);
      this.$el.find('#go-back-view')
        .append(goBackView.render().el);
    },

    // Renders workout form view
    renderWorkoutFormView: function(options) {
      var workoutFormView = new WorkoutFormView(options);
      this.childViews.push(workoutFormView);
      this.$el.find('#workout-form-view')
        .append(workoutFormView.render().el);
    },

    // Renders exercise form view
    renderExerciseFormView: function(options) {
      var exercisesFormView = new ExercisesFormView(options);
      // Listen to 'ExerciseFormView' in order to add
      // an exercise to a workout
      this.listenTo(exercisesFormView, 'exercise:add',
        this.addExerciseToCollection);
      this.childViews.push(exercisesFormView);
      this.$el.find('#exercises-form-view')
        .append(exercisesFormView.render().el);
    },

    // Renders an add workout form view
    renderAddWorkoutFormView: function(options) {
      var addWorkoutFormView = new AddWorkoutFormView(options);
      // Listen to 'AddWorkoutFormView' in order
      // to add a workout
      this.listenTo(addWorkoutFormView, 'workout:add',
        this.addWorkoutToCollection);
      // save shild views
      this.childViews.push(addWorkoutFormView);
      this.$el.find('#add-workout-view')
        .append(addWorkoutFormView.render().el);
    }

  });

  return AddWorkoutManager;

});
