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
'lang/en_locale',
], function ($, _, Backbone, JST, enLocale) {

  'use strict';

  var WorkoutFormView = Backbone.View.extend({

    template: JST['app/scripts/templates/add_workout/workout_form_view.hbs'],

    tagName: 'div',

    attributes: { id: 'workout-form-view' },

    initialize: function (options) {
      var that = this;
      this.router = options.router;
    },

    render: function () {
      // this.$el.html(this.template(enLocale.addWorkout.closeAddWorkoutView));
      // return this;
    }

  });

  return WorkoutFormView;

});