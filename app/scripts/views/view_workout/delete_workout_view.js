/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the delete workout view
 */

/*global define, confirm*/
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'lang/en_locale'
], function($, _, Backbone, Handlebars, enLocale) {

  'use strict';

  var DeleteWorkoutView = Backbone.View.extend({

    template: Handlebars.compile(
      '<button id="delete-workout">{{ deleteButton.text }}</button>'
      ),

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
      this.$el.html(this.template(enLocale.viewWorkout.deleteWorkoutView));
      return this;
    },

    deleteWorkout: function(event) {
      event.preventDefault();
      var answer = confirm(enLocale.viewWorkout.deleteWorkoutView.deleteWorkoutAlert.text);
      if (answer) {
        this.trigger('workout:delete');
      }
    }

  });

  return DeleteWorkoutView;

});
