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
      reps: '',
      sets: '',
      weight: ''
    },

    validate: function (attrs) {
      var errors = [];

      if(_.has(attrs, 'title')) {
        if (!attrs.title || !attrs.title.length > 0) {
          errors.push({ name: 'title', message: enLocale.exerciseModel.title.required });
        }
      }

      if(_.has(attrs, 'reps')) {
        if (isNaN(attrs.reps)) {
          errors.push({ name: 'reps', message: enLocale.exerciseModel.reps.required });
        } else if (typeof attrs.reps !== 'number') {
          errors.push({ name: 'reps', message: enLocale.exerciseModel.reps.number });
        }
      }

      if(_.has(attrs, 'sets')) {
        if (isNaN(attrs.sets)) {
          errors.push({ name: 'sets', message: enLocale.exerciseModel.sets.required });
        } else if (typeof attrs.sets !== 'number') {
          errors.push({ name: 'sets', message: enLocale.exerciseModel.sets.number });
        }
      }

      if(_.has(attrs, 'weight')) {
        if (typeof attrs.weight !== 'number' || isNaN(attrs.weight)) {
          errors.push({ name: 'weight', message: enLocale.exerciseModel.weight.number });
        } else if (attrs.weight < 0) {
          errors.push({ name: 'weight', message: enLocale.exerciseModel.weight.required });
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
     * returns true if model is valid, false otherwise
     */
    isExerciseValid: function() {
      return this.isValid();
    },

    /**
     * reset the model back to its defaults
     */
    resetExercise: function() {
      this.clear().set(this.defaults);
    },

    /**
     * returns exercise title
     */
    getExerciseTitle: function() {
      return this.get('title');
    }

  });

  return Excercise;

});