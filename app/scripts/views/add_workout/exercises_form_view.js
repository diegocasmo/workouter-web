/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the main close add workout view.
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


    initialize: function(options) {
      this.router = options.router;
      this.exerciseModel = options.exerciseModel;
    },

    render: function() {
      this.$el.html(this.template(enLocale.addWorkout.exercisesFormView));
      return this;
    }

  });

  return ExercisesFormView;

});
