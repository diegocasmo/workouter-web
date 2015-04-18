/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the workout form view.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'lang/en_locale',
], function($, _, Backbone, JST, enLocale) {

  'use strict';

  var WorkoutFormView = Backbone.View.extend({

    template: JST['app/scripts/templates/add_workout/workout_form_view.hbs'],

    tagName: 'div',

    attributes: {
      id: 'workout-form-view'
    },

    events: {
      'focusout .workout-title': 'validateWorkoutTitle',
      'focusin .workout-title': 'resetInputValidation'
    },

    initialize: function(options) {
      this.workoutModel = options.workoutModel;
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.addWorkout.workoutFormView));
      return this;
    },

    validateWorkoutTitle: function(event) {
      event.preventDefault();
      var $workoutTitle = this.$el.find('.workout-title');
      if(this.workoutModel.setTitle($workoutTitle.val())) {
        $workoutTitle.addClass('input-valid');
      } else {
        $workoutTitle.addClass('input-invalid');
      }
    },

    resetInputValidation: function(event) {
      event.preventDefault();
      this.$el.find('.workout-title').removeClass('input-valid input-invalid');
    }

  });

  return WorkoutFormView;

});
