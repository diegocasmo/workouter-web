/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: App router to trigger appropiate events
 *              which application managers listen to.
 */

define([
  'jquery',
  'backbone',
  'routers/base_router',
  'services/auth_service',
  'managers/login_manager',
  'managers/workouts_home_manager',
  'managers/profile_manager',
  'managers/add_workout_manager',
  'managers/view_workout_manager'
], function($, Backbone, BaseRouter, AuthService, LoginManager,
            WorkoutsHomeManager, ProfileManager, AddWorkoutManager,
            ViewWorkoutManager) {

  'use strict';

  var loginManager = null,
      workoutsHomeManager = null,
      profileManager = null,
      addWorkoutManager = null,
      viewWorkoutManager = null;

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
      this.addClassToBody(route);
      this.removeActiveLayout()
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

    // removes active layout if any
    removeActiveLayout: function() {
      if(this.activeLayout) {
        this.activeLayout.remove();
        this.activeLayout = null;
      }
    },

    // returns true if a route is private,
    // false otherwise
    isRoutePrivate: function(route) {
      return (this.publicRoutes.indexOf(route) > -1) ? false : true;
    },

    /**
     * show login page (public)
     */
    showLogin: function() {
      var eventTrigger = 'goTo:login';
      if(!loginManager) {
        loginManager = new LoginManager({
          router: this,
          eventTrigger: eventTrigger
        });
      }
      this.activeLayout = loginManager;
      this.trigger(eventTrigger);
    },

    /**
     * show user all workouts view (private)
     */
    showWorkouts: function() {
      var eventTrigger = 'goTo:workouts';
      if(!workoutsHomeManager) {
        workoutsHomeManager = new WorkoutsHomeManager({
          router: this,
          eventTrigger: eventTrigger
        });
      }
      this.activeLayout = workoutsHomeManager;
      this.trigger(eventTrigger);
    },

    /**
     * show add workout form (private)
     */
    addWorkout: function() {
      var eventTrigger = 'goTo:addWorkout';
      if(!addWorkoutManager) {
        addWorkoutManager = new AddWorkoutManager({
          router: this,
          eventTrigger: eventTrigger
        });
      }
      this.activeLayout = addWorkoutManager;
      this.trigger(eventTrigger);
    },

    /**
     * show user exercises perform on a single workout (private)
     */
    showWorkoutExercises: function(workoutId) {
      var eventTrigger = 'goTo:exercises';
      if(!viewWorkoutManager) {
        viewWorkoutManager = new ViewWorkoutManager({
          router: this,
          eventTrigger: eventTrigger
        });
      }
      // make sure id is always updated
      viewWorkoutManager.workoutId = workoutId;
      this.activeLayout = viewWorkoutManager;
      this.trigger(eventTrigger);
    },

    /**
     * show user profile (private)
     */
    showProfile: function() {
      var eventTrigger = 'goTo:profile';
      if(!profileManager) {
        profileManager = new ProfileManager({
          router: this,
          eventTrigger: eventTrigger
        });
      }
      this.activeLayout = profileManager;
      this.trigger(eventTrigger);
    },

    // adds class to body in order to be able
    // to indentify from CSS what page are we in
    addClassToBody: function(route) {
      // remove old class
      this.$body.removeClass();

      // choose new class
      var defaultClass = 'login-page';
      switch(route) {
        case 'workouts':
          defaultClass = 'workouts-page'
          break;
        case 'workout/add':
          defaultClass = 'workout-add-page'
          break;
        case 'workout/:id/exercises':
          defaultClass = 'workout-page'
          break;
        case 'me':
          defaultClass = 'profile-page'
          break;
      }
      this.$body.addClass(defaultClass);
    }

  });

  return AppRouter;
});