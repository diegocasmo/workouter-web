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
  'models/user_model',
  'models/exercise_model',
  'models/workout_model',
  'collections/exercises_collection',
  'collections/workouts_collection',
], function($, Backbone, BaseRouter, AuthService, LoginManager,
            WorkoutsHomeManager, ProfileManager, AddWorkoutManager,
            ViewWorkoutManager, UserModel, ExerciseModel, WorkoutModel,
            ExercisesCollection, WorkoutsCollection) {

  'use strict';

  var AppRouter = BaseRouter.extend({

    publicRoutes: ['', 'login', '*actions'],

    routes: {
      'login'                : 'showLogin',
      'workouts'             : 'showWorkouts',
      'workout/add'          : 'addWorkout',
      'workout/:id/exercises': 'showWorkoutExercises',
      'me'                   : 'showProfile',
      '*actions'             : 'showLogin'
    },

    // Check wheter the current route is private or public
    // and handles user authentication appropriately
    before: function(route) {
      route = $.trim(route);
      this._removeActiveManager();
      if(!AuthService.isUserLoggedIn() && this._isRoutePrivate(route)) {
        // If user is not logged in, then redirect to login page
        this.navigate('login', { trigger: true });
        return false;
      } else if (AuthService.isUserLoggedIn() && !this._isRoutePrivate(route)) {
        // If user is already logged in, but attemps to navigate
        // a public route, redirect to workouts
        this.navigate('workouts', { trigger: true });
        return false;
      }
    },

    // Show login page (public)
    showLogin: function() {
      var eventName = 'login:show',
      loginManager = new LoginManager({
        router        : this,
        eventName     : eventName,
        userModel     : UserModel.getInstance(),
        managerClass  : 'login-page'
      });
      this.activeManager = loginManager;
      this.trigger(eventName);
    },

    // Show user all workouts view (private)
    showWorkouts: function() {
      var eventName = 'workouts:show',
      workoutsHomeManager = new WorkoutsHomeManager({
        router              : this,
        eventName           : eventName,
        workoutsCollection  : new WorkoutsCollection(),
        managerClass        : 'workouts-page'
      });
      this.activeManager = workoutsHomeManager;
      this.trigger(eventName);
    },

    // Show add workout form (private)
    addWorkout: function() {
      var eventName = 'workout:add:show',
      addWorkoutManager = new AddWorkoutManager({
        router              : this,
        eventName           : eventName,
        userModel           : UserModel.getInstance(),
        workoutModel        : new WorkoutModel(),
        workoutsCollection  : new WorkoutsCollection(),
        exerciseModel       : new ExerciseModel(),
        exercisesCollection : new ExercisesCollection(),
        managerClass        : 'workout-add-page'
      });
      this.activeManager = addWorkoutManager;
      this.trigger(eventName);
    },

    // Show user exercises perform on a single workout (private)
    showWorkoutExercises: function(workoutId) {
      var workoutsCollection = new WorkoutsCollection(),
          workoutModel = workoutsCollection.getWorkout(workoutId);
      if(workoutModel) {
        var eventName = 'exercises:show',
        viewWorkoutManager = new ViewWorkoutManager({
          router              : this,
          eventName           : eventName,
          workoutId           : workoutId,
          workoutModel        : workoutModel,
          workoutsCollection  : workoutsCollection,
          managerClass        : 'workout-page'
        });
        this.activeManager = viewWorkoutManager;
        this.trigger(eventName);
      } else {
        this.navigate('workouts', { trigger: true });
        return false;
      }
    },

    // Show user profile (private)
    showProfile: function() {
      var eventName = 'profile:show',
      profileManager = new ProfileManager({
        router        : this,
        eventName     : eventName,
        userModel     : UserModel.getInstance(),
        managerClass  : 'profile-page'
      });
      this.activeManager = profileManager;
      this.trigger(eventName);
    }

  });

  return AppRouter;

});
