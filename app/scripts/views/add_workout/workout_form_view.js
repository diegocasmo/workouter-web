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
  'handlebars',
  'lang/en_locale',
], function($, _, Backbone, Handlebars, enLocale) {

  'use strict';

  var WorkoutFormView = Backbone.View.extend({

    template: Handlebars.compile(
      '<h3 class="add-workout-header">{{ title }}</h3>' +
      '<input type="text" class="add-workout--title" placeholder={{ workoutTitle.placeholder }}>'
      ),

    tagName: 'div',

    attributes: {
      id: 'workout-form-view'
    },

    events: {
      'focusout .add-workout--title': 'validateWorkoutTitle',
      'focusin .add-workout--title': 'resetInputValidation'
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
      var $workoutTitle = this.$el.find('.add-workout--title');
      if(this.workoutModel.setTitle($workoutTitle.val())) {
        $workoutTitle.addClass('input-valid');
      } else {
        $workoutTitle.addClass('input-invalid');
      }
    },

    resetInputValidation: function(event) {
      event.preventDefault();
      this.$el.find('.add-workout--title').removeClass('input-valid input-invalid');
    }

  });

  return WorkoutFormView;

});
