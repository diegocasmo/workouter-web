// Delete workout bottom view

/*global define, confirm*/
define([
  'jquery',
  'underscore',
  'backbone',
  'lang/en_locale'
], function($, _, Backbone, enLocale) {

  'use strict';

  var DeleteWorkoutView = Backbone.View.extend({

    template: _.template(
      '<button id="delete-workout"><%= deleteButton %></button>'
      ),

    className: 'delete-workout-view',

    events: {
      'click button#delete-workout': 'deleteWorkout'
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
