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
  'handlebars',
  'lang/en_locale'
], function($, _, Backbone, Handlebars, enLocale) {

  'use strict';

  var AddWorkoutFormView = Backbone.View.extend({

    template: Handlebars.compile(
      '<button class="add-workout">{{ addButton.text }}</button>'
      ),

    className: 'add-workout-view',

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
      this.trigger('workout:add');
    }

  });

  return AddWorkoutFormView;

});
