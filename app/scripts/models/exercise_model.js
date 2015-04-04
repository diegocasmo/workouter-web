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

    defaults: {
      id: 0,
      workoutId: 0,
      title: '',
      reps: 0,
      sets: 0,
      weight: 0
    },

    validate: function (attrs) {
      var errors = [];

      if (typeof attrs.id !== 'number') {
        errors.push({ name: 'id', message: enLocale.exerciseModel.id.required });
      }

      if (!attrs.workoutId || typeof attrs.workoutId !== 'number') {
        errors.push({ name: 'workoutId', message: enLocale.exerciseModel.workoutId.required });
      }

      if (!attrs.title) {
        errors.push({ name: 'title', message: enLocale.exerciseModel.title.required });
      } else if (attrs.title.length <= 3) {
        errors.push({ name: 'title', message: enLocale.exerciseModel.title.minLength });
      }

      if (!attrs.reps) {
        errors.push({ name: 'reps', message: enLocale.exerciseModel.reps.required });
      } else if (typeof attrs.reps !== 'number') {
        errors.push({ name: 'reps', message: enLocale.exerciseModel.reps.number });
      }

      if (!attrs.sets) {
        errors.push({ name: 'sets', message: enLocale.exerciseModel.sets.required });
      } else if (typeof attrs.sets !== 'number') {
        errors.push({ name: 'sets', message: enLocale.exerciseModel.sets.number });
      }

      if (!attrs.weight) {
        errors.push({ name: 'weight', message: enLocale.exerciseModel.weight.required });
      } else if (typeof attrs.weight !== 'number') {
        errors.push({ name: 'weight', message: enLocale.exerciseModel.weight.number });
      }

      return errors.length > 0 ? errors : false;
    }

  });

  return Excercise;

});