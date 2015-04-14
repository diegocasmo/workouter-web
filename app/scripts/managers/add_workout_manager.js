/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render profile view
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'models/user_model',
  'models/workout_model',
  'models/exercise_model',
  'collections/exercises_collection',
  'views/add_workout/close_add_workout_view',
  'views/add_workout/workout_form_view',
  'views/add_workout/exercises_form_view'
], function($, _, Backbone, BaseManager, UserModel, WorkoutModel,
            ExerciseModel, ExercisesCollection, CloseAddWorkoutView,
            WorkoutFormView, ExercisesFormView) {

  'use strict';

  var AddWorkoutManager = BaseManager.extend({

    el: $('#app-wrapper'),

    userModel: UserModel.getInstance(),

    workoutModel: new WorkoutModel(),

    exerciseModel: new ExerciseModel(),

    exercisesCollection: new ExercisesCollection(),

    /**
     * override destroyChildViews from base_manager
     * in order to destroy models and collections
     */
    destroyChildViews: function() {
      this.exercisesCollection.removeAllExercises();
      BaseManager.prototype.destroyChildViews();
    },

    buildChildViews: function(options) {
      // add models and collections to option to make
      // sure child views have access to them
      options.workoutModel = this.workoutModel;
      options.exerciseModel = this.exerciseModel;
      options.exercisesCollection = this.exercisesCollection;

      // initialize subviews
      this.closeAddWorkoutView = new CloseAddWorkoutView(options);
      this.workoutFormView = new WorkoutFormView(options);
      this.exercisesFormView = new ExercisesFormView(options);

      // hook exercisesFormView to be able to add an exercise
      // to the exercises collection
      this.listenTo(this.exercisesFormView, 'exercise:add',
        this.addExerciseToCollection);

      // save shild views
      this.childViews.push(this.closeAddWorkoutView);
      this.childViews.push(this.workoutFormView);
      this.childViews.push(this.exercisesFormView);

      // make sure we set the owner of this workout
      this.addUserToWorkout();

      this.render();
    },

    render: function() {
      this.$el.append(this.closeAddWorkoutView.render().el);
      this.$el.append(this.workoutFormView.render().el);
      this.$el.append(this.exercisesFormView.render().el);
      return this;
    },

    addUserToWorkout: function() {
      this.workoutModel.setCurrentUser(this.userModel.toJSON());
    },

    addExerciseToCollection: function() {
      this.exercisesCollection.addExercise(this.exerciseModel.toJSON());
      this.exerciseModel.resetExercise();
    }

  });

  return AddWorkoutManager;

});