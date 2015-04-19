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
  'lang/en_locale'
], function($, _, Backbone, JST, enLocale) {

  'use strict';

  var WorkoutItemView = Backbone.View.extend({

    template: JST['app/scripts/templates/workouts_home/workout_item_view.hbs'],

    tagName: 'div',

    attributes: {
      class: 'workout-item'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template({}));
      return this;
    }

  });

  return WorkoutItemView;

});
