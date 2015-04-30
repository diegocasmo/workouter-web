/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A collection of workouts.
 */

/*global define, Firebase*/
define([
  'jquery',
  'underscore',
  'backbone',
  'models/workout_model',
  'models/user_model',
  'services/firebase_service',
  'firebase',
  'backbonefire'
], function($, _, Backbone, WorkoutModel, UserModel, FirebaseService) {

  'use strict';

  var Workouts = Backbone.Firebase.Collection.extend({

    model: WorkoutModel,

    /**
     * URL where this resource is going to be stored
     * for this specific user
     */
    url: function() {
      var userModel = UserModel.getInstance();

      var url = FirebaseService.url + 'workouts/' +
                userModel.getUniqueIdentifier();

      return new Firebase(url);
    },

    /**
     * Adds a workout to the collection
     */
    addWorkout: function(workout) {
      this.add(workout.toJSON());
    },

    /**
     * fetch all workouts and trigger success if successful,
     * trigger error otherwise
     */
    getWorkouts: function() {
      var that = this;
      this.fetch({
          success: function(collection, response, options) {
            that.trigger('success');
          },
          error: function(collection, response, options) {
            that.trigger('error');
          }
      });
    },

    /**
     * get specific collection workout
     * returns workout if found, false otherwise
     */
    getWorkout: function(workoutId) {
      var workout = this.get(workoutId);
      if(workout) {
        return workout;
      }
      return false;
    },

    /**
     * removes a workout from collection
     */
    removeWorkout: function(workoutId) {
      var workout = this.findWhere({ id: workoutId });
      this.remove(workout);
    }

  });

  return Workouts;

});