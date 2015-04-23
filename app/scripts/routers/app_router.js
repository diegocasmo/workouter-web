/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: App router to trigger appropiate events
 *              which managers listen to
 */

define([
  'jquery',
  'backbone',
  'services/auth_service',
  'managers/login_manager',
  'managers/workouts_home_manager',
  'managers/profile_manager',
  'managers/add_workout_manager',
  'managers/view_workout_manager'
], function($, Backbone, AuthService, LoginManager, WorkoutsHomeManager,
            ProfileManager, AddWorkoutManager, ViewWorkoutManager) {

  'use strict';

  var loginManager = null,
      workoutsHomeManager = null,
      profileManager = null,
      addWorkoutManager = null,
      viewWorkoutManager = null;

  var AppRouter = Backbone.Router.extend({

    activeLayout: null,

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
     * and handle user authentication appropriately. It also
     * manages activeLayout state
     */
    before: function(route) {
      if(this.activeLayout) {
        this.activeLayout.destroyChildViews();
        this.activeLayout.remove();
        this.activeLayout = null;
      }

      var isPrivate = true;
      route = $.trim(route);
      if(this.publicRoutes.indexOf(route) > -1) {
        isPrivate = false;
      }

      if(!AuthService.isUserLoggedIn() && isPrivate) {
        // if user is not logged in, then redirect to login page
        this.navigate('login', { trigger: true });
        return false;
      } else if (AuthService.isUserLoggedIn() && !isPrivate) {
        // if user is already logged in, but attemps to navigate
        // a public route, redirect to workouts
        this.navigate('workouts', { trigger: true });
        return false;
      }
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
          eventTrigger: eventTrigger,
          workoutId: workoutId
        });
      }
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
    }

  });

  return AppRouter;
});