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

    userModel: UserModel.getInstance(),

    url: function() {
      return new Firebase(FirebaseService.url + this.userModel.getUniqueIdentifier());
    }

  });

  return Workouts;

});