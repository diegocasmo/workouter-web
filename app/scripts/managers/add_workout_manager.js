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
  'models/workout_model',
  'views/add_workout/close_add_workout_view',
  'views/add_workout/workout_form_view'
], function($, _, Backbone, BaseManager, UserModel, WorkoutModel,
            CloseAddWorkoutView, WorkoutFormView) {

  'use strict';

  var AddWorkoutManager = BaseManager.extend({

    el: $('#app-wrapper'),

    userModel: UserModel.getInstance(),

    workoutModel: new WorkoutModel(),

    buildChildViews: function(options) {
      // add models and collections to option to make
      // sure child views have access to them
      options.workoutModel = this.workoutModel;

      // initialize subviews
      this.closeAddWorkoutView = new CloseAddWorkoutView(options);
      this.workoutFormView = new WorkoutFormView(options);

      // save shild views
      this.childViews.push(this.closeAddWorkoutView);
      this.childViews.push(this.workoutFormView);

      // make sure we set the owner of this workout
      this.addUserToWorkout();

      this.render();
    },

    render: function() {
      this.$el.append(this.closeAddWorkoutView.render().el);
      this.$el.append(this.workoutFormView.render().el);
      return this;
    },

    addUserToWorkout: function() {
      this.workoutModel.setCurrentUser(this.userModel.toJSON());
    }

  });

  return AddWorkoutManager;

});