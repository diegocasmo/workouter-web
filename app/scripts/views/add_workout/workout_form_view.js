// A view for the workout form view.

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'helpers/flash_message_helper',
  'lang/en_locale',
], function($, _, Backbone, Handlebars, FlashMessage, enLocale) {

  'use strict';

  var WorkoutFormView = Backbone.View.extend({

    template: Handlebars.compile(
      '<h3 class="add-workout-header">{{ title }}</h3>' +
      '<input name="title" type="text" class="add-workout--title" placeholder={{ workoutTitle.placeholder }}>'
      ),

    className: 'workout-form-view',

    events: {
      'focusout .add-workout--title'  : 'setWorkoutTitle',
      'focusin .add-workout--title'   : 'resetInputValidation'
    },

    initialize: function(options) {
      this.workoutModel = options.workoutModel;
      this.listenTo(this.workoutModel, 'invalid', this.handleInvalidWorkout);
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.addWorkout.workoutFormView));
      return this;
    },

    handleInvalidWorkout: function() {
      var error = this.workoutModel.firstValidationError();
      FlashMessage.showError(error.message);
      this.$el.find('input[name="' + error.name + '"]')
        .addClass('input-invalid');
    },

    // Sets workout title
    setWorkoutTitle: function(event) {
      event.preventDefault();
      var workoutTitle = this.$el.find('.add-workout--title').val();
      this.workoutModel.setTitle(workoutTitle);
    },

    resetInputValidation: function(event) {
      event.preventDefault();
      this.$el.find('.add-workout--title')
        .removeClass('input-valid input-invalid');
    }

  });

  return WorkoutFormView;

});
