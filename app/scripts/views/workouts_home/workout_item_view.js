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
  'handlebars',
  'helpers/handlebars_helpers'
], function($, _, Backbone, Handlebars) {

  'use strict';

  var WorkoutItemView = Backbone.View.extend({

    template: Handlebars.compile(
      '<a class="workout-item-link" href="#workout/{{id}}/exercises">' +
        '<h6 class="workout-item-date">' +
          '{{# beautify_date }} {{ date }} {{/ beautify_date }}' +
        '</h6>' +
        '<p class="workout-item-title">{{ title }}</p>' +
        '<i class="workout-item-caret-icon fa fa-caret-right"></i>' +
      '</a>'
    ),

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
