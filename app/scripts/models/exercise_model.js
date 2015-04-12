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
      title: '',
      reps: 0,
      sets: 0,
      weight: 0
    },

    validate: function (attrs) {
      var errors = [];

      if(_.has(attrs, 'title')) {
        if (!attrs.title || !attrs.title.length > 0) {
          errors.push({ name: 'title', message: enLocale.exerciseModel.title.required });
        }
      }

      if(_.has(attrs, 'reps')) {
        if (!attrs.reps) {
          errors.push({ name: 'reps', message: enLocale.exerciseModel.reps.required });
        } else if (typeof attrs.reps !== 'number') {
          errors.push({ name: 'reps', message: enLocale.exerciseModel.reps.number });
        }
      }

      if(_.has(attrs, 'sets')) {
        if (!attrs.sets) {
          errors.push({ name: 'sets', message: enLocale.exerciseModel.sets.required });
        } else if (typeof attrs.sets !== 'number') {
          errors.push({ name: 'sets', message: enLocale.exerciseModel.sets.number });
        }
      }

      if(_.has(attrs, 'weight')) {
        if (!attrs.weight) {
          errors.push({ name: 'weight', message: enLocale.exerciseModel.weight.required });
        } else if (typeof attrs.weight !== 'number') {
          errors.push({ name: 'weight', message: enLocale.exerciseModel.weight.number });
        }
      }

      return errors.length > 0 ? errors : false;
    },

    /**
     * dynamically validates an attr and attrValue
     */
    validateAttr: function(attr, attrValue) {
      attrValue = $.trim(attrValue);

      // convert to num if necessary
      var convertToNum = ['reps', 'sets', 'weight'];
      if(convertToNum.indexOf(attr) > -1) {
        attrValue = parseInt(attrValue);
      }

      // use a mapper to be able to dynamically set model property
      var mapper = {};
      mapper[attr] = attrValue;
      if(!this.validate(mapper)) {
        this.set(mapper);
        return true;
      }

      // return back to default
      mapper[attr] = this.defaults[attr];
      this.set(mapper);
      return false;
    },

    /**
     * Returns true if model is valid, false otherwise
     */
    isExerciseValid: function() {
      // make sure id is incremented by one before saving
      if(this.isValid()) {
        return true;
      }
      return false;
    },

    /**
     * reset the model back to its defaults
     */
    resetExercise: function() {
      this.clear().set(this.defaults);
    }

  });

  return Excercise;

});