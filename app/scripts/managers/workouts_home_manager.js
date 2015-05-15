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
  'backbone-paginated-collection',
  'services/config_service',
  'lang/en_locale'
], function($, _, Backbone, BaseManager, WorkoutsCollection,
            BottomMenuView, WorkoutItemView, AddFirstWorkoutView,
            FlashMessage, PaginatedCollection, ConfigService,
            enLocale) {

  'use strict';

  var WorkoutsHomeManager = BaseManager.extend({

    el: $('#app-wrapper'),

    /**
     * override destroyChildViews from base_manager
     * in order to unbind window scroll event
     */
    destroyChildViews: function() {
      $(window).off('scroll');
      BaseManager.prototype.destroyChildViews();
    },

    buildChildViews: function(options) {
      // scroll to top
      window.scrollTo(0, 0);

      this.options = options;

      // bind window scroll event to loadMore
      $(window).on('scroll', _.bind(this.loadMore, this));

      // initialize collection
      this.workoutsCollection = new WorkoutsCollection();

      // attach events
      this.attachCollectionEvents();

      // initialize child views
      this.bottomMenuView = new BottomMenuView(options);

      // save child views
      this.childViews.push(this.bottomMenuView);

      // attempt to fetch collection
      this.workoutsCollection.getWorkouts();

      this.render();
    },

    render: function() {
      this.$el.append(this.bottomMenuView.render().el);
      return this;
    },

    /**
     * return workouts list if greater than zero,
     * false otherwise
     */
    getAllWorkouts: function() {
      var that = this;
      if(this.workoutsCollection.models.length > 0) {
        // make sure to use reverse in order to show
        // the latest workout first on the list
        this.workoutsCollection.models = this.workoutsCollection.models.reverse();

        // assign collection to PaginatedCollection
        that.paginatedWorkouts = new PaginatedCollection(
          this.workoutsCollection, { perPage: ConfigService.pagination.perPage });

        var workoutItemsViews = that.paginatedWorkouts.map(function(workout) {
          var workoutView = new WorkoutItemView({workoutModel: workout});
          // save as child view to be able to delete it
          that.childViews.push(workoutView);
          return workoutView.render().el;
        });

        return workoutItemsViews;
      }

      return false;
    },

    /**
     * attaches collection events to this view
     */
    attachCollectionEvents: function() {
      this.listenTo(this.workoutsCollection, 'success', this.renderAllWorkouts);
      this.listenTo(this.workoutsCollection, 'error', this.errorOnFetch);
    },

    /**
     * renders workout collection if length is greater
     * than zero. If not, renders add first workout view
     */
    renderAllWorkouts: function() {
      var workoutItemsViews = this.getAllWorkouts();
      // if no workout items views display
      // add workout message
      if(workoutItemsViews) {
        // html needs to be preprend in order to be
        // added before bottomMenuView
        this.$el.prepend(workoutItemsViews);
      } else {
        this.addFirstWorkoutView = new AddFirstWorkoutView(this.options);
        // save as child view
        this.childViews.push(this.addFirstWorkoutView);
        // html needs to be preprend in order to be
        // added before bottomMenuView
        this.$el.prepend(this.addFirstWorkoutView.render().el);
      }
    },

    errorOnFetch: function() {
      var message = enLocale.flashMessage.errorFetchingCollection;
      FlashMessage.showError(message);
    },

    /**
     * load more workouts on user scroll
     */
    loadMore: function() {
      // make sure user scroll reached bottom of the page
      if($(window).scrollTop() >= $(document).height() - $(window).height() &&
        typeof this.paginatedWorkouts !== 'undefined') {
        if(this.paginatedWorkouts.hasNextPage()) {
          // get next page
          this.paginatedWorkouts.nextPage();

          var that = this;
          var workoutItemsViews = this.paginatedWorkouts.map(function(workout) {
            var workoutView = new WorkoutItemView({ workoutModel: workout });
            // save as child view to be able to delete it
            that.childViews.push(workoutView);
            return workoutView.render().el;
          });

          // append before menu to view
          this.$el.find('#bottom-menu-view').before(workoutItemsViews);
        }
      }
    }

  });

  return WorkoutsHomeManager;

});