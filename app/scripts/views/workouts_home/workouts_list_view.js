/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render login view
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'collections/workouts_collection',
  'views/workouts_home/workout_item_view'
], function($, _, Backbone, WorkoutsCollection, WorkoutItemView) {

  'use strict';

  var LoginManager = Backbone.View.extend({

    el: $('#workouts-list-wrapper'),

    initialize: function(options) {
      // initialize options
      this.router = options.router;

      // initialize collection
      this.workoutsCollection = new WorkoutsCollection();

      // attach events
      this.attachCollectionEvents();

      // attempt to fetch collection
      this.workoutsCollection.getWorkouts();
    },

    render: function() {
      var workoutItemsView = this.workoutsCollection.map(function(workout) {
          return (new WorkoutItemView({
              workoutModel: workout
          })).render().el;
      });

      this.$el.html(workoutItemsView);
      return this;
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

  return LoginManager;

});