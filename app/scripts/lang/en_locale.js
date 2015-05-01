/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: English strings used for UI and application
 *              messages
 */

/*global define*/
define({
  appName: 'Workouter',
  daysNames:[{
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }],
  monthsNames: [{
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  }],
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
    },
    avatar: {
      required: 'Invalid avatar'
    },
    userLocation: {
      required: 'Invalid location'
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
      required: 'Please, enter a date.'
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
    twitterLoginView: {
      twitterLoginText: {
        text: 'Login with Twitter'
      }
    }
  },
  profile: {
    profileLogoutView: {
      logoutText: {
        text: 'Logout'
      }
    },
    profileUserView: {

    },
    profileGoBackView: {

    }
  },
  addWorkout: {
    closeAddWorkoutView: {

    },
    workoutFormView: {
      title: 'Workout',
      workoutTitle: {
        placeholder: 'Title'
      }
    },
    exercisesFormView: {
      title: 'Exercises',
      exerciseTitle: {
        placeholder: 'Title'
      },
      exerciseReps: {
        placeholder: 'Reps'
      },
      exerciseSets: {
        placeholder: 'Sets'
      },
      exerciseWeight: {
        placeholder: 'Weight'
      },
      addExerciseButton: {
        text: 'Add Exercise'
      },
      exercisesTotalCount: {
        text: 'Exercises:',
        initialCount: '0'
      }
    },
    addWorkoutFormView: {
      addButton: {
        text: 'Add Workout'
      }
    }
  },
  bottomMenuView: {

  },
  workoutsHome: {
    workoutItemView: {

    },
    addFirstWorkoutView: {
      addWorkoutMsg: 'Add your first workout!'
    }
  },
  viewWorkout: {
    closeViewWorkoutView: {

    },
    workoutView: {

    },
    deleteWorkoutView: {
      deleteButton: {
        text: 'Delete Workout'
      },
      deleteWorkoutAlert: {
        text: 'Are you sure you want to delete this workout?'
      }
    }
  },
  flashMessage: {
    exerciseAdded: ' has been added.',
    workoutAdded: ' has been successfully added.',
    workoutDelete: ' has been successfully deleted.',
    exerciseError: 'Please, enter a valid exercise.',
    workoutError: 'Please, fill all the mandatory fields.',
    errorFetchingCollection: 'There was an error while trying to fetch collection.'
  }
});