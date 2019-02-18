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

// Return a paginated array of exercises optionally filtered by exercises that have a name
// which includes the specified name query (case-insensitive)
export async function fetchExercises(opts = {}) {
  // Assign defaults to pagination if arguments are not provided
  const {name = null, pageNum = 0, perPage = 10, db = connection} = opts
  // Perform case-insensitive search if a name query is provided
  const lowerCaseName = name ? name.toLowerCase() : null
  // Return paginated results filtered by an optional name query
  return db.exercises
    .orderBy('id')
    .filter(x => name
      ? `${x.name}`.toLowerCase().includes(lowerCaseName)
      : true)
    .offset(pageNum * perPage)
    .limit(perPage)
    .toArray()
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
