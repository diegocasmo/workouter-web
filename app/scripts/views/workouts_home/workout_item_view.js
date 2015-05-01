/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the workout item view
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'helpers/handlebars_helpers'
], function($, _, Backbone, JST) {

  'use strict';

  var WorkoutItemView = Backbone.View.extend({

    template: JST['app/scripts/templates/workouts_home/workout_item_view.hbs'],

    tagName: 'article',

    attributes: {
      class: 'workout-item'
    },

    initialize: function(options) {
      this.router = options.router;
      this.workoutModel = options.workoutModel;
    },

    render: function() {
      this.$el.html(this.template(this.workoutModel.toJSON()));
      return this;
    }

  });

  return WorkoutItemView;

});
