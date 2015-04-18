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
      var userModel = UserModel.getInstance(),
          url = FirebaseService.url + 'workouts/' + userModel.getUniqueIdentifier();
      return new Firebase(url);
    },

    /**
     * Adds a workout to the collection
     */
    addWorkout: function(workout) {
      this.add(workout.toJSON());
    }

  });

  return Workouts;

});