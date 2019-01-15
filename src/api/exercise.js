import connection from './db'
import {string, object} from 'yup'
import {transformYupToFormikError} from './utils/error-transform'

// An exercise schema
export const ExerciseSchema = object().shape({
  name: string()
          .trim('Name must be a trimmed string').strict()
          .required('Name is required')
})

// Validate an exercise attributes. Return a resolved Promise with with the
// valid attrs, a Rails-like error object otherwise
export function validateExercise(attrs) {
  return ExerciseSchema.validate(attrs)
    .catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

// Return an array of exercises
export function fetchExercises(db = connection) {
  return db.exercises.toArray()
}

// Return an exercise from DB
export function getExercise(id, db = connection) {
  return db.exercises.get(id)
}

// Returns a created exercise in DB if successful, a rejected Promise with a Rails-like
// object of errors otherwise
export function createExercise(attrs, db = connection) {
  return validateExercise(attrs)
    .then(() => db.exercises.add(attrs))
    .then((id) => db.exercises.get(id))
}

// Delete an exercise using its id from DB. Return a Promise with the number
// of elements successfully deleted from DB
export function deleteExercise(id, db = connection) {
  return db.exercises.where({id}).delete()
}

// Returns an updated exercise from DB, a rejected Promise with a Rails-like
// object of errors otherwise
export function updateExercise({id, ...attrs}, db = connection) {
  return validateExercise(attrs)
    .then(() => db.exercises.update(id, attrs))
    .then(() => db.exercises.get(id))
}
