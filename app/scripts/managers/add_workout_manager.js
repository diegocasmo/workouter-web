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
  'collections/workouts_collection',
  'views/elements/go_back_view',
  'views/add_workout/workout_form_view',
  'views/add_workout/exercises_form_view',
  'views/add_workout/add_workout_form_view',
  'helpers/flash_message_helper',
  'lang/en_locale'
], function($, _, Backbone, BaseManager, UserModel, WorkoutModel,
            ExerciseModel, ExercisesCollection, WorkoutsCollection,
            GoBackView, WorkoutFormView, ExercisesFormView,
            AddWorkoutFormView, FlashMessage, enLocale) {

  'use strict';

  var AddWorkoutManager = BaseManager.extend({

    userModel: UserModel.getInstance(),

    workoutModel: new WorkoutModel(),

    exerciseModel: new ExerciseModel(),

    exercisesCollection: new ExercisesCollection(),

    /**
     * override 'remove' from base_manager
     * in order to destroy models and collections
     */
    remove: function() {
      this.exercisesCollection.removeAllExercises();
      BaseManager.prototype.remove.call(this);
    },

    buildChildViews: function(options) {
      // add models and collections to option to make
      // sure child views have access to them
      options.workoutModel = this.workoutModel;
      options.exerciseModel = this.exerciseModel;
      options.exercisesCollection = this.exercisesCollection;

      // initialize subviews
      this.goBackView = new GoBackView(options);
      this.workoutFormView = new WorkoutFormView(options);
      this.exercisesFormView = new ExercisesFormView(options);
      this.addWorkoutFormView = new AddWorkoutFormView(options);

      // hook exercisesFormView to be able to add an exercise
      // to the exercises collection
      this.listenTo(this.exercisesFormView, 'exercise:add',
        this.addExerciseToCollection);

      this.listenTo(this.addWorkoutFormView, 'workout:add',
        this.addWorkoutToCollection);

      // save shild views
      this.childViews.push(this.goBackView);
      this.childViews.push(this.workoutFormView);
      this.childViews.push(this.exercisesFormView);
      this.childViews.push(this.addWorkoutFormView);

      // make sure we set the owner of this workout
      this.addUserToWorkout();

      this.render();
    },

    render: function() {
      this.$el.append(this.goBackView.render().el);
      this.$el.append(this.workoutFormView.render().el);
      this.$el.append(this.exercisesFormView.render().el);
      this.$el.append(this.addWorkoutFormView.render().el);
      return this;
    },

    addUserToWorkout: function() {
      this.workoutModel.setCurrentUser(this.userModel.toJSON());
    },

    addExerciseToCollection: function() {
      this.exercisesCollection.addExercise(this.exerciseModel.toJSON());
      var message = this.exerciseModel.getExerciseTitle() +
        enLocale.flashMessage.exerciseAdded;
      FlashMessage.showSuccess(message);
      this.exerciseModel.resetExercise();
    },

    addWorkoutToCollection: function() {
      // initialize collection and create workout
      var workoutsCollection = new WorkoutsCollection(),
          exercisesCollection = this.exercisesCollection.toJSON(),
          workout = this.workoutModel.createWorkout(exercisesCollection);
      // add workout to collection if valid
      if(workout) {
        workoutsCollection.addWorkout(workout);
        var message = workout.getWorkoutTitle() +
          enLocale.flashMessage.workoutAdded;
        FlashMessage.showSuccess(message);
        this.router.navigate('workouts', { trigger: true });
      } else {
        var message = enLocale.flashMessage.workoutError;
        FlashMessage.showError(message);
      }
    }

  });

  return AddWorkoutManager;

});
