/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A model for an excercise.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'lang/en_locale'
], function($, _, Backbone, enLocale) {

  'use strict';

  var Excercise = Backbone.Model.extend({


    validate: function (attrs) {
      var errors = [];

      if (!attrs.title || !attrs.title.length > 0) {
        errors.push({ name: 'title', message: enLocale.exerciseModel.title.required });
      }

      if (isNaN(attrs.sets)) {
        errors.push({ name: 'sets', message: enLocale.exerciseModel.sets.required });
      } else if (typeof attrs.sets !== 'number') {
        errors.push({ name: 'sets', message: enLocale.exerciseModel.sets.number });
      }

      if (isNaN(attrs.reps)) {
        errors.push({ name: 'reps', message: enLocale.exerciseModel.reps.required });
      } else if (typeof attrs.reps !== 'number') {
        errors.push({ name: 'reps', message: enLocale.exerciseModel.reps.number });
      }

      if (!attrs.weight || !attrs.weight.toString().length > 0) {
        errors.push({ name: 'weight', message: enLocale.exerciseModel.weight.required });
      }

      return errors.length > 0 ? errors : false;
    },

    // Sets an exercise attributes
    setExercise: function(attrs) {
      this.set(attrs);
    },

    // Returns true if model is valid, false otherwise
    isExerciseValid: function() {
      return this.isValid();
    },

    // Gets first exercise validation error if any
    firstValidationError: function() {
      return _.first(this.validate(this.toJSON()));
    },

    // Reset the model back to its defaults
    resetExercise: function() {
      this.clear();
    },

    // Returns exercise title
    getExerciseTitle: function() {
      return this.get('title');
    }

  });

  return Excercise;

});
