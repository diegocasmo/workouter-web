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
  'views/workouts_home/workout_item_view',
  'views/workouts_home/add_first_workout_view',
  'helpers/flash_message_helper',
  'lang/en_locale'
], function($, _, Backbone, BaseManager, WorkoutsCollection,
            BottomMenuView, WorkoutItemView, AddFirstWorkoutView,
            FlashMessage, enLocale) {

  'use strict';

  var WorkoutsHomeManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      this.options = options;

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
      // if no workout items views display
      // add workout message
      if(workoutItemsViews) {
        this.$el.append(workoutItemsViews);
      } else {
        this.addFirstWorkoutView = new AddFirstWorkoutView(this.options);
        // save as child view
        this.childViews.push(this.addFirstWorkoutView);
        this.$el.append(this.addFirstWorkoutView.render().el);
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

      return false;
    },

    /**
     * attaches collection events to this view
     */
    attachCollectionEvents: function() {
      this.listenTo(this.workoutsCollection, 'success', this.render);
      this.listenTo(this.workoutsCollection, 'error', this.errorOnFetch);
    },

    errorOnFetch: function() {
      var message = enLocale.flashMessage.errorFetchingCollection;
      FlashMessage.showError(message);
    }

  });

  return WorkoutsHomeManager;

});