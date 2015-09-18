// View manager to render home workouts view

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'views/elements/bottom_menu_view',
  'views/workouts_home/workout_item_view',
  'views/workouts_home/add_first_workout_view',
  'services/list_paginator',
  'services/auth_service'
], function($, _, Backbone, BaseManager, BottomMenuView,
            WorkoutItemView, AddFirstWorkoutView, ListPaginator,
            AuthService) {

  'use strict';

  var WorkoutsHomeManager = BaseManager.extend({

    // Override 'remove' from 'BaseManager'
    // in order to unbind window scroll event
    remove: function() {
      this.unbindScrollEvent();
      BaseManager.prototype.remove.call(this);
    },

    initializeManager: function(options) {
      this.workoutsCollection = options.workoutsCollection;
      this.bindCollectionEvents();
      this.workoutsCollection.getWorkouts();
      this.render();
      this.renderBottomMenuView();
    },

    render: function() {
      return this;
    },

    // Binds window scroll event to 'loadMoreWorkouts'
    bindScrollEvent: function() {
      $(window).on('scroll', _.bind(this.loadMoreWorkouts, this));
    },

    // Unbind window scroll event
    unbindScrollEvent: function() {
      $(window).off('scroll');
    },

    // Binds collection events to this view
    bindCollectionEvents: function() {
      this.listenTo(this.workoutsCollection, 'success',
        this.setupPaginatedWorkouts);
      this.listenTo(this.workoutsCollection, 'error',
        this.errorOnFetch);
    },

    // Sets up paginated workouts
    setupPaginatedWorkouts: function() {
      if(this.workoutsCollection.hasWorkouts()) {
        this.paginatedWorkouts = new ListPaginator(
          this.workoutsCollection.models
        );
        this.renderWorkoutList(this.paginatedWorkouts.getFirstPage());
        this.bindScrollEvent();
      } else {
        this.renderAddFirstWorkoutView();
      }
    },

    // Renders add first workout view
    renderAddFirstWorkoutView: function() {
      var addFirstWorkoutView = new AddFirstWorkoutView(this.options);
      this.childViews.push(addFirstWorkoutView);
      // HTML needs to be preprend to be
      // added before 'bottomMenuView'
      this.$el.prepend(addFirstWorkoutView.render().el);
    },

    // Renders a list of workouts
    renderWorkoutList: function(workoutList) {
      var that = this;
      var workoutViewList = _.map(workoutList, function(workoutModel) {
        var workoutView = new WorkoutItemView({
          workoutModel: workoutModel
        });
        that.childViews.push(workoutView);
        return workoutView.render().el;
      });
      // HTML needs to be preprend to be
      // added before 'bottomMenuView'
      this.$el.prepend(workoutViewList);
    },

    // Error on fetch, log user out
    errorOnFetch: function() {
      AuthService.logUserOut();
      this.router.navigate('login', { trigger: true });
    },

    // Load more workouts on user scroll
    loadMoreWorkouts: function() {
      var pageBottom = $(document).height() - $(window).height();
      if ($(window).scrollTop() >= pageBottom) {
        this.renderWorkoutList(this.paginatedWorkouts.getNextPage());
      }
    },

    // Renders bottom menu view
    renderBottomMenuView: function() {
      var bottomMenuView = new BottomMenuView(this.options);
      this.childViews.push(bottomMenuView);
      this.$el.append(bottomMenuView.render().el);
    }

  });

  return WorkoutsHomeManager;

});
