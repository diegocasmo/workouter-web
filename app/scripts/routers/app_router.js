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
  'managers/login_manager'
], function($, Backbone, AuthService, LoginManager) {

  'use strict';

  var loginManager = null;

  var AppRouter = Backbone.Router.extend({

    activeLayout: null,

    publicRoutes: ['', 'login'],

    routes: {
      'login'                     : 'showLogin',
      'workouts'                  : 'showWorkouts',
      'workout/:id/exercises'    : 'showWorkoutExercises',
      'workout/:id/exercises/:id': 'showWorkoutExercise',
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
      // AuthService.logUserOut();
      var isPrivate = true;
      route = $.trim(route);
      if(this.publicRoutes.indexOf(route) > 0) {
        isPrivate = false;
      }

      if(!AuthService.isUserLoggedIn() && isPrivate) {
        // if user is not logged in, then redirect to login page
        // and reset user model JIC
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
      this.trigger(eventTrigger);
    },

    /**
     * show user exercises perform on a single workout (private)
     */
    showWorkoutExercises: function(workoutId) {
      var eventTrigger = 'goTo:exercises';
      this.trigger(eventTrigger);
    },

    /**
     * show single user exercise of a single workout (private)
     */
    showWorkoutExercise: function(workoutId, exerciseId) {
      var eventTrigger = 'goTo:exercise';
      this.trigger(eventTrigger);
    },

    /**
     * show user profile (private)
     */
    showProfile: function() {
      var eventTrigger = 'goTo:profile';
      this.trigger(eventTrigger);
    }

  });

  return AppRouter;
});