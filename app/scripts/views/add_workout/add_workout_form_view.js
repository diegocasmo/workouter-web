/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the add workout button.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'lang/en_locale'
], function($, _, Backbone, JST, enLocale) {

  'use strict';

  var AddWorkoutFormView = Backbone.View.extend({

    template: JST['app/scripts/templates/add_workout/add_workout_view.hbs'],

    tagName: 'div',

    attributes: {
      id: 'add-workout-view'
    },

    events: {
      'click button.add-workout': 'addWorkout'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.addWorkout.addWorkoutFormView));
      return this;
    },

    addWorkout: function(event) {
      event.preventDefault();
    }

  });

  return AddWorkoutFormView;

});
