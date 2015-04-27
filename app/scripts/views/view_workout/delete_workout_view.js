/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the delete workout view
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

  var DeleteWorkoutView = Backbone.View.extend({

    template: JST['app/scripts/templates/view_workout/delete_workout_view.hbs'],

    tagName: 'div',

    attributes: {
      class: 'delete-workout-view'
    },

    events: {
      'click button#delete-workout': 'deleteWorkout'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.addWorkout.deleteWorkoutView));
      return this;
    },

    deleteWorkout: function(event) {
      event.preventDefault();
    }

  });

  return DeleteWorkoutView;

});
