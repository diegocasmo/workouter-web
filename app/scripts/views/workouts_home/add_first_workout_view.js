/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the add first workout view.
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

  var AddFirstWorkoutView = Backbone.View.extend({

    template: JST['app/scripts/templates/workouts_home/add_first_workout_view.hbs'],

    tagName: 'div',

    attributes: {
      id: 'add-first-workout-view'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.workoutsHome.addFirstWorkoutView));
      return this;
    }

  });

  return AddFirstWorkoutView;

});
