/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view workout view.
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

  var WorkoutView = Backbone.View.extend({

    template: JST['app/scripts/templates/view_workout/workout_view.hbs'],

    tagName: 'div',

    attributes: {
      class: 'workout-view'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.viewWorkout.workoutView));
      return this;
    }

  });

  return WorkoutView;

});
