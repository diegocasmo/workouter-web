/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A collection of exercises.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'models/exercise_model',
  'localstorage'
], function($, _, Backbone, ExerciseModel) {

  'use strict';

  var Exercise = Backbone.Collection.extend({

    model: ExerciseModel,

    localStorage: new Backbone.LocalStorage('ExerciseCollection')

  });

  return Exercise;

});