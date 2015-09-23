// A view for the exercises form view.

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'helpers/flash_message_helper',
  'lang/en_locale',
], function($, _, Backbone, JST, FlashMessage, enLocale) {

  'use strict';

  var ExercisesFormView = Backbone.View.extend({

    template: JST['app/scripts/templates/add_workout/exercises_form_view.hbs'],

    className: 'exercises-form-view',

    events: {
      'focusin input'       : 'resetInputValidation',
      'click #add-exercise' : 'addExercise'
    },

    initialize: function(options) {
      this.router               = options.router;
      this.exerciseModel        = options.exerciseModel;
      this.exercisesCollection  = options.exercisesCollection;
      this.listenTo(this.exercisesCollection, 'add', this.updateExercisesCount);
    },

    render: function() {
      this.$el.html(this.template(enLocale.addWorkout.exercisesFormView));
      return this;
    },

    // Resets all inputs to their initial state
    resetAllInputs: function() {
      var inputs = this.$el.find('input');
      _.each(inputs, function(input) {
        var $input = $(input);
        $input.val('');
        $input.removeClass('input-valid input-invalid');
      });
    },

    // Resets a single input element validation classes
    resetInputValidation: function(event) {
      event.preventDefault();
      var $element = $(event.currentTarget);
      $element.removeClass('input-valid input-invalid');
    },

    addExercise: function(event) {
      event.preventDefault();
      this.exerciseModel.setExercise(this.getExerciseInputValues());
      if(this.exerciseModel.isExerciseValid()) {
        this.trigger('exercise:add');
        this.resetAllInputs();
      } else {
        var error = this.exerciseModel.firstValidationError();
        FlashMessage.showError(error.message);
        this.$el.find('input[name="' + error.name + '"]')
          .addClass('input-invalid');
      }
    },

    // Returns exercise input valis in DOM
    getExerciseInputValues: function() {
      return {
        title: this.$el.find('input[name="title"]').val(),
        sets: parseInt(this.$el.find('input[name="sets"]').val()),
        reps: parseInt(this.$el.find('input[name="reps"]').val()),
        weight: this.$el.find('input[name="weight"]').val()
      };
    },

    // Updates exercises count in DOM
    updateExercisesCount: function() {
      this.$el.find('#exercises-total').text(
        this.exercisesCollection.getTotal()
      );
    }

  });

  return ExercisesFormView;

});
