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
      id: 0,
      title: '',
      user: new UserModel(),
      date: new Date(),
      exercises: []
    },

    validate: function (attrs) {
      var errors = [];

      if (typeof attrs.id !== 'number') {
        errors.push({ name: 'id', message: enLocale.workoutModel.id.required });
      }

      if (!attrs.title) {
        errors.push({ name: 'title', message: enLocale.workoutModel.title.required });
      } else if (attrs.title.length <= 3) {
        errors.push({ name: 'title', message: enLocale.workoutModel.title.minLength });
      }

      if(typeof attrs.user !== 'object') {
        errors.push({ name: 'user', message: enLocale.workoutModel.user.required });
      }

      if (!attrs.date) {
        errors.push({ name: 'date', message: enLocale.workoutModel.date.required });
      } else if (typeof attrs.date !== 'object') {
        errors.push({ name: 'date', message: enLocale.workoutModel.date.date });
      }

      if (attrs.exercises.length <= 0) {
        errors.push({ name: 'exercises', message: enLocale.workoutModel.exercises.required });
      } else if (typeof attrs.exercises !== 'object') {
        errors.push({ name: 'exercises', message: enLocale.workoutModel.exercises.array });
      }

      return errors.length > 0 ? errors : false;
    }

  });

  return Workout;

});