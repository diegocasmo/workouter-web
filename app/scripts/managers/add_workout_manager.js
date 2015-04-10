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
  'views/add_workout/close_add_workout_view'
], function($, _, Backbone, BaseManager, CloseAddWorkoutView) {

  'use strict';

  var AddWorkoutManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      this.closeAddWorkoutView = new CloseAddWorkoutView(options);
      this.childViews.push(this.closeAddWorkoutView);
      this.render();
    },

    render: function() {
      this.$el.append(this.closeAddWorkoutView.render().el);
      return this;
    }

  });

  return AddWorkoutManager;

});