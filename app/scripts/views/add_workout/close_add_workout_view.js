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
  'lang/en_locale'
], function($, _, Backbone, JST, enLocale) {

  'use strict';

  var CloseAddWorkoutView = Backbone.View.extend({

    template: JST['app/scripts/templates/add_workout/close_add_workout_view.hbs'],

    tagName: 'div',

    attributes: {
      id: 'close-add-workout-view'
    },

    events: {
      'click i.fa-close': 'close'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.addWorkout.closeAddWorkoutView));
      return this;
    },

    close: function(event) {
      event.preventDefault();
      this.router.navigateToPreviousRoute();
    }

  });

  return CloseAddWorkoutView;

});
