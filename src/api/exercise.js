import connection from './db'
import {string, object} from 'yup'
import {transformYupToFormikError} from './utils/error-transform'
import {trimmedMsg, requiredMsg} from './utils/error-message'

// An exercise schema
export const ExerciseSchema = object().shape({
  name: string()
          .trim(trimmedMsg('Name')).strict()
          .required(requiredMsg('Name'))
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

// Return an exercise from DB if it exists, otherwise reject with an error
export async function getExercise(id, db = connection) {
  const exercise = await db.exercises.get(id)
  return exercise ? exercise : Promise.reject(new Error(`Exercise ${id} doesn't exist`))
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
export async function deleteExercise(id, db = connection) {
  const deleted = await db.exercises.where({id}).delete()
  return deleted ? deleted : Promise.reject(new Error(`Unable to delete exercise ${id}`))
}

// Returns an updated exercise from DB, a rejected Promise with a Rails-like
// object of errors otherwise
export function updateExercise({id, ...attrs}, db = connection) {
  return validateExercise(attrs)
    .then(() => db.exercises.update(id, attrs))
    .then(() => db.exercises.get(id))
}
