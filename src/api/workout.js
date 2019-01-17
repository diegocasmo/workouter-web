import connection from './db'
import {string, number, array, object} from 'yup'
import {transformYupToFormikError} from './utils/error-transform'

// A workout schema
export const WorkoutSchema = object().shape({
  name: string()
          .trim('Name must be a trimmed string').strict()
          .required('Name is required'),
  rounds: number('Rounds must be a number')
            .positive('Rounds must be a positive number')
            .required('Rounds is required'),
  restTimePerRound: number('Rest time per round must be a number')
            .positive('Rest time per round must be a positive number')
            .required('Rest time per round is required'),
  restTimePerExercise: number('Rest time per exercise must be a number')
            .positive('Rest time per exercise must be a positive number')
            .required('Rest time per exercise is required'),
  exercises: array().of(
    object().shape({
      name: string()
              .trim('Exercise name must be a trimmed string').strict()
              .required('Exercise name is required'),
      quantity: number('Quantity must be a number')
                .positive('Quantity must be a positive number')
                .required('Quantity is required'),
      unit: string()
              .trim('Unit must be a trimmed string').strict()
              .required('Unit is required'),
      weight: number('Weight must be a number')
                .positive('Weight must be a positive number')
                .nullable(), // Maybe: https://github.com/jaredpalmer/formik/issues/284
    })
  ).required('Exercises are required')
})

// Validate a workout attributes. Return a resolved Promise with with the
// valid attrs, a Rails-like error object otherwise
export function validateWorkout(attrs) {
  return WorkoutSchema.validate(attrs)
    .catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

// Return an array of workouts
export function fetchWorkouts(db = connection) {
  return db.workouts.toArray()
}

// Returns a created workout in DB if successful, a rejected Promise with a Rails-like
// object of errors otherwise
export function createWorkout(attrs, db = connection) {
  return validateWorkout(attrs)
    .then(() => db.workouts.add(attrs))
    .then((id) => db.workouts.get(id))
}
