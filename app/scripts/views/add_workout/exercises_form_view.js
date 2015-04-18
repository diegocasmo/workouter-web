/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the exercises form view.
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

  var ExercisesFormView = Backbone.View.extend({

    template: JST['app/scripts/templates/add_workout/exercises_form_view.hbs'],

    tagName: 'div',

    attributes: {
      id: 'exercises-form-view'
    },

    events: {
      'focusout input': 'validateExerciseInput',
      'focusin input': 'resetInputValidation',
      'click #add-exercise': 'addExercise'
    },

    initialize: function(options) {
      this.router = options.router;
      this.exerciseModel = options.exerciseModel;
      this.exercisesCollection = options.exercisesCollection;
      this.listenTo(this.exercisesCollection, 'add', this.updateExercisesCount);
    },

    render: function() {
      this.$el.html(this.template(enLocale.addWorkout.exercisesFormView));
      return this;
    },

    validateExerciseInput: function(event) {
      event.preventDefault();
      var $element = $(event.currentTarget);
      var attr = $element.attr('name'),
          attrValue = $element.val();

      if(this.exerciseModel.validateAttr(attr, attrValue)) {
        $element.addClass('input-valid');
      } else {
        $element.addClass('input-invalid');
      }
    },

    /**
     * restes all inputs to their initial state
     */
    resetsInputs: function() {
      var inputs = this.$el.find('input');
      _.each(inputs, function(input) {
        var $input = $(input);
        $input.val('');
        $input.removeClass('input-valid input-invalid');
      });
    },

    resetInputValidation: function(event) {
      event.preventDefault();
      var $element = $(event.currentTarget);
      $element.removeClass('input-valid input-invalid');
    },

    addExercise: function(event) {
      event.preventDefault();
      if(this.exerciseModel.isExerciseValid()) {
        this.trigger('exercise:add');
        this.resetsInputs();
      } else {
        console.log('Cant\'t add exercise');
      }
    },

    updateExercisesCount: function() {
      var collectionLength = this.exercisesCollection.getLength();
      this.$el.find('#exercises-total').text(collectionLength);
    }

  });

  return ExercisesFormView;

});
