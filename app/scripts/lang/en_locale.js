/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: English strings used for UI and application
 *              messages
 */

/*global define*/
define({
  appName: 'Workouter',
  userModel: {
    uid: {
      required: 'Invalid uid.',
      validUidProvider: 'Invalid uid provider.'
    },
    provider: {
      validProvider: 'Invalid provider.'
    },
    token: {
      validToken: 'Invalid token.'
    },
    username: {
      required: 'Invalid username.'
    },
    displayName: {
      required: 'Invalid displayName.'
    }
  },
  workoutModel: {
    id: {
      required: 'Invalid id.'
    },
    title: {
      required: 'Please, enter a title.'
    },
    user: {
      required: 'Invalid user.'
    },
    date: {
      required: 'Please, enter a date.',
      date: 'Please, enter a valid date.'
    },
    exercises: {
      required: 'Please, enter the excercises.',
      array: 'Please, enter valid excercises.'
    }
  },
  exerciseModel: {
    id: {
      required: 'Invalid id.'
    },
    workoutId: {
      required: 'Invalid workout_id.'
    },
    title: {
      required: 'Please, enter a title.'
    },
    reps: {
      required: 'Please, enter the number of repetitions.',
      number: 'Repetitions needs to be a number.'
    },
    sets: {
      required: 'Please, enter the number of sets.',
      number: 'Sets needs to be a number.'
    },
    weight: {
      required: 'Please, enter a weight.',
      number: 'Weight needs to be a number.'
    }
  },
  login: {
    loginMainView: {
      twitterButton: {
        text: 'Login with Twitter'
      }
    }
  },
  profile: {
    profileMainView: {
      logoutButton: {
        text: 'Logout'
      }
    }
  },
  addWorkout: {
    closeAddWorkoutView: {
      closeButton: {
        text: 'Close'
      }
    },
    workoutFormView: {
      title: 'Workout',
      workoutTitle: {
        placeholder: 'Title'
      }
    },
    exercisesFormView: {
      title: 'Exercises'
    }
  }
});