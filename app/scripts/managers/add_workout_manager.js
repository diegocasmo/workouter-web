/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render profile view
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'models/user_model',
  'views/add_workout/close_add_workout_view',
  'views/add_workout/workout_form_view'
], function($, _, Backbone, BaseManager, UserModel, CloseAddWorkoutView,
            WorkoutFormView) {

  'use strict';

  var AddWorkoutManager = BaseManager.extend({

    el: $('#app-wrapper'),

    userModel: UserModel.getInstance(),

    buildChildViews: function(options) {
      this.closeAddWorkoutView = new CloseAddWorkoutView(options);
      this.workoutFormView = new WorkoutFormView(options);
      // save shild views
      this.childViews.push(this.closeAddWorkoutView);
      this.childViews.push(this.workoutFormView);
      this.render();
    },

    render: function() {
      this.$el.append(this.closeAddWorkoutView.render().el);
      this.$el.append(this.workoutFormView.render().el);
      return this;
    }

  });

  return AddWorkoutManager;

});