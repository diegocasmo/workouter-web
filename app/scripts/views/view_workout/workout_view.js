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

    className: 'workout-view',

    initialize: function(options) {
      this.router = options.router;
      this.workoutModel = options.workoutModel;
    },

    render: function() {
      var jsonData = enLocale.viewWorkout.workoutView;
      $.extend(jsonData, this.workoutModel.toJSON());
      this.$el.html(this.template(jsonData));
      return this;
    }

  });

  return WorkoutView;

});
