/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A model for a workout.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/exercises_collection',
  'models/user_model',
  'lang/en_locale'
], function($, _, Backbone, ExercisesCollectionm, UserModel, enLocale) {

  'use strict';

  var Workout = Backbone.Model.extend({

    defaults: {
      date: Date.now()
    },

    validate: function (attrs) {
      var errors = [];

      if (!attrs.title || !attrs.title.length > 0) {
        errors.push({ name: 'title', message: enLocale.workoutModel.title.required });
      }

      if(typeof attrs.user !== 'object') {
        errors.push({ name: 'user', message: enLocale.workoutModel.user.required });
      }

      if (!attrs.date) {
        errors.push({ name: 'date', message: enLocale.workoutModel.date.required });
      } else if (typeof attrs.date !== 'number') {
        errors.push({ name: 'date', message: enLocale.workoutModel.date.required });
      }

      if (!attrs.exercises || attrs.exercises.length <= 0) {
        errors.push({ name: 'exercises', message: enLocale.workoutModel.exercises.required });
      } else if (typeof attrs.exercises !== 'object') {
        errors.push({ name: 'exercises', message: enLocale.workoutModel.exercises.array });
      }

      return errors.length > 0 ? errors : false;
    },

    // Sets the user as the workout's owner.
    // returns true if successful, false otherwise
    assignCurrentUser: function(userAttrs) {
      var userModel = UserModel.getInstance();
      userModel.set(userAttrs);
      if(userModel.isValid()) {
        this.set('user', userModel.toJSON());
        return true;
      }
      return false;
    },

    // Sets the workout title
    setTitle: function(title) {
      title = $.trim(title);
      this.set('title', title);
    },

    // Gets first workout validation error if any
    firstValidationError: function() {
      return _.first(this.validate(this.toJSON()));
    },

    getWorkoutTitle: function() {
      return this.get('title');
    },

    createWorkout: function(exercises) {
      this.set('date', Date.now());
      this.set('exercises', exercises);
      return this.isValid() ? this : false;
    }

  });

  return Workout;

});
