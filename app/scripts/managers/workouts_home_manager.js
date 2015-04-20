/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render workouts view
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'collections/workouts_collection',
  'views/elements/bottom_menu_view',
  'views/workouts_home/workout_item_view'
], function($, _, Backbone, BaseManager, WorkoutsCollection,
            BottomMenuView, WorkoutItemView) {

  'use strict';

  var WorkoutsHomeManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      // initialize child views
      this.bottomMenuView = new BottomMenuView(options);

      // save child views
      this.childViews.push(this.bottomMenuView);

      // initialize collection
      this.workoutsCollection = new WorkoutsCollection();

      // attach events
      this.attachCollectionEvents();

      // attempt to fetch collection
      this.workoutsCollection.getWorkouts();
    },

    render: function() {

      var workoutItemsViews = this.getAllWorkouts();
      // if no workout items views
      if(workoutItemsViews) {
        this.$el.append(workoutItemsViews);
      } else {
        // should display add a workout message
        console.log('should display add a workout message');
      }

      this.$el.append(this.bottomMenuView.render().el);
      return this;
    },

    /**
     * return workouts list if greater than zero,
     * false otherwise
     */
    getAllWorkouts: function() {
      var that = this;
      var workoutItemsViews = this.workoutsCollection.map(function(workout) {
          var workoutView = new WorkoutItemView({workoutModel: workout});
          // save as child view to be able to delete it
          that.childViews.push(workoutView);
          return workoutView.render().el;
      });

      if(workoutItemsViews.length > 0) {
        // make sure to use reverse in order to show
        // the latest workout first on the list
        return workoutItemsViews.reverse();
      }

      return false
    },

    /**
     * attaches collection events to this view
     */
    attachCollectionEvents: function() {
      this.listenTo(this.workoutsCollection, 'success', this.render);
      this.listenTo(this.workoutsCollection, 'error', this.errorOnFetch);
    },

    errorOnFetch: function() {
      console.log('There was an error while trying to fetch collection.');
    }

  });

  return WorkoutsHomeManager;

});