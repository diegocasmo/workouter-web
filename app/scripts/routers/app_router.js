/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: App router to trigger appropiate events
 *              which managers listen to
 */

define([
  'jquery',
  'backbone',
  'services/auth_service'
], function($, Backbone, AuthService) {

  'use strict';

  var AppRouter = Backbone.Router.extend({

    routes: {
      'login'                     : 'showLogin',
      'workouts'                  : 'showWorkouts',
      'workouts/:id/exercises'    : 'showWorkoutExercises',
      'workouts/:id/exercises/:id': 'showWorkoutExercise',
      'me'                        : 'showProfile',
      '*actions'                  : 'showLogin'
    },

    /**
     * check wheter the current route is private or public
     * and handle user authentication appropriately
     */
    before: function(route) {
      var isUserLoggedIn = AuthService.isUserLoggedIn(),
          isPrivate = true;

      route = $.trim(route);

      if(route === '' || route === 'login') {
        isPrivate = false;
      }

      if(!isUserLoggedIn && isPrivate) {
        // if user is not logged in, then redirect to
        // login page
        this.navigate('login', {trigger: true});
      }
    },

    /**
     * show login page (public)
     */
    showLogin: function() {
      this.trigger('login_manager:show');
    },

    /**
     * show user all workouts view (private)
     */
    showWorkouts: function() {
      this.trigger('workout_manager:show:all');
    },

    /**
     * show user exercises perform on a single workout (private)
     */
    showWorkoutExercises: function(workoutId) {
      this.trigger('workout_manager:show:exercises');
    },

    /**
     * show single user exercise of a single workout (private)
     */
    showWorkoutExercise: function(workoutId, exerciseId) {
      this.trigger('workout_manager:show:exercise');
    },

    /**
     * show user profile (private)
     */
    showProfile: function() {
      this.trigger('profile_manager:show');
    }

  });

  return AppRouter;
});