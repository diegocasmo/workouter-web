// App router to trigger appropiate events
// which application managers listen to.

define([
  'jquery',
  'backbone',
  'routers/base_router',
  'services/auth_service',
  'managers/login_manager',
  'managers/workouts_home_manager',
  'managers/profile_manager',
  'managers/add_workout_manager',
  'managers/view_workout_manager',
  'collections/workouts_collection'
], function($, Backbone, BaseRouter, AuthService, LoginManager,
            WorkoutsHomeManager, ProfileManager, AddWorkoutManager,
            ViewWorkoutManager, WorkoutsCollection) {

  'use strict';

  var AppRouter = BaseRouter.extend({

    publicRoutes: ['', 'login', '*actions'],

    routes: {
      'login'                     : 'showLogin',
      'workouts'                  : 'showWorkouts',
      'workout/add'               : 'addWorkout',
      'workout/:id/exercises'     : 'showWorkoutExercises',
      'me'                        : 'showProfile',
      '*actions'                  : 'showLogin'
    },

    /**
     * check wheter the current route is private or public
     * and handles user authentication appropriately
     */
    before: function(route) {
      route = $.trim(route);
      this.removeActiveManager();
      if(!AuthService.isUserLoggedIn() && this.isRoutePrivate(route)) {
        // if user is not logged in, then redirect to login page
        this.navigate('login', { trigger: true });
        return false;
      } else if (AuthService.isUserLoggedIn() && !this.isRoutePrivate(route)) {
        // if user is already logged in, but attemps to navigate
        // a public route, redirect to workouts
        this.navigate('workouts', { trigger: true });
        return false;
      }
    },

    /**
     * returns true if a route is private,
     * false otherwise
     */
    isRoutePrivate: function(route) {
      return (this.publicRoutes.indexOf(route) > -1) ? false : true;
    },

    /**
     * show login page (public)
     */
    showLogin: function() {
      var eventTrigger = 'login:show',
      loginManager = new LoginManager({
        router: this,
        eventTrigger: eventTrigger,
        managerClass: 'login-page'
      });
      this.activeManager = loginManager;
      this.trigger(eventTrigger);
    },

    /**
     * show user all workouts view (private)
     */
    showWorkouts: function() {
      var eventTrigger = 'workouts:show',
      workoutsHomeManager = new WorkoutsHomeManager({
        router: this,
        eventTrigger: eventTrigger,
        workoutsCollection: new WorkoutsCollection(),
        managerClass: 'workouts-page'
      });
      this.activeManager = workoutsHomeManager;
      this.trigger(eventTrigger);
    },

    /**
     * show add workout form (private)
     */
    addWorkout: function() {
      var eventTrigger = 'workout:add:show',
      addWorkoutManager = new AddWorkoutManager({
        router: this,
        eventTrigger: eventTrigger,
        managerClass: 'workout-add-page'
      });
      this.activeManager = addWorkoutManager;
      this.trigger(eventTrigger);
    },

    /**
     * show user exercises perform on a single workout (private)
     */
    showWorkoutExercises: function(workoutId) {
      var eventTrigger = 'exercises:show',
      viewWorkoutManager = new ViewWorkoutManager({
        router: this,
        eventTrigger: eventTrigger,
        managerClass: 'workout-page'
      });
      // make sure id is always updated
      viewWorkoutManager.workoutId = workoutId;
      this.activeManager = viewWorkoutManager;
      this.trigger(eventTrigger);
    },

    /**
     * show user profile (private)
     */
    showProfile: function() {
      var eventTrigger = 'profile:show',
      profileManager = new ProfileManager({
        router: this,
        eventTrigger: eventTrigger,
        managerClass: 'profile-page'
      });
      this.activeManager = profileManager;
      this.trigger(eventTrigger);
    }

  });

  return AppRouter;

});
