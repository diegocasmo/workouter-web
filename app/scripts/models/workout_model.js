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

      if(_.has(attrs, 'id')) {
        if (typeof attrs.id !== 'number') {
          errors.push({ name: 'id', message: enLocale.workoutModel.id.required });
        }
      }

      if(_.has(attrs, 'title')) {
        if (!attrs.title || !attrs.title.length > 0) {
          errors.push({ name: 'title', message: enLocale.workoutModel.title.required });
        }
      }

      if(_.has(attrs, 'user')) {
        if(typeof attrs.user !== 'object') {
          errors.push({ name: 'user', message: enLocale.workoutModel.user.required });
        }
      }

      if(_.has(attrs, 'date')) {
        if (!attrs.date) {
          errors.push({ name: 'date', message: enLocale.workoutModel.date.required });
        } else if (typeof attrs.date !== 'object') {
          errors.push({ name: 'date', message: enLocale.workoutModel.date.date });
        }
      }

      if(_.has(attrs, 'exercises')) {
        if (attrs.exercises.length <= 0) {
          errors.push({ name: 'exercises', message: enLocale.workoutModel.exercises.required });
        } else if (typeof attrs.exercises !== 'object') {
          errors.push({ name: 'exercises', message: enLocale.workoutModel.exercises.array });
        }
      }

      return errors.length > 0 ? errors : false;
    },

    /**
     * sets the user as the workout's owner.
     * returns true if successful, false otherwise
     */
    setCurrentUser: function(userAttrs) {
      var userModel = UserModel.getInstance();
      userModel.set(userAttrs);
      if(userModel.isValid()) {
        this.set('user', userModel.toJSON());
        return true;
      }
      return false;
    },

    /**
     * sets the workout title
     * returns true if successful, false otherwise
     */
    setTitle: function(title) {
      title = $.trim(title);
      if(!this.validate({ 'title': title })) {
        this.set('title', title);
        return true;
      }
      // return back to default
      this.set('title', this.defaults.title);
      return false;
    }

  });

  return Workout;

});