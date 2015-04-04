/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: English strings used for UI and application
 *              messages
 */

/*global define*/
define({
  appName: 'Workouter',
  workoutModel: {
    id: {
      required: 'Invalid id.'
    },
    title: {
      required: 'Please, enter a title.',
      minLength: 'The title needs to be greater than 3 characters.'
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
      required: 'Please, enter a title.',
      minLength: 'The title needs to be greater than 3 characters.'
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
  }
});