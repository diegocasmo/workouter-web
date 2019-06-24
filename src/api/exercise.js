import connection from './db'
import {string, object} from 'yup'
import {transformYupToFormikError} from './utils/error-transform'
import {requiredMsg} from './utils/error-message'

// An exercise schema
export const ExerciseSchema = object().shape({
  name: string()
          .trim()
          .required(requiredMsg('Name'))
})

// Validate an exercise attributes. Return a resolved Promise with with the
// valid attrs, a Rails-like error object otherwise
export function validateExercise(attrs) {
  return ExerciseSchema.validate(attrs)
    .catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

// Return a paginated array of exercises sorted by ascending name, optionally filtered by
// exercises that have a name which includes the specified name query (case-insensitive)
export async function fetchExercises(opts = {}) {
  const {name = null, pageNum = 0, perPage = 10, db = connection} = opts

  // Perform case-insensitive search if a name query is provided
  const caseInsensitiveName = name ? name.toLowerCase() : null

  // Return paginated results filtered by an optional name query
  // Note: Dexie doesn't support case-insensitive `orderBy`. As a result,
  // all exercises are retrieved using `toArray` in order to use native
  // Array methods
  let exercises = await db.exercises.toArray()
  if (caseInsensitiveName) {
    exercises = exercises.filter(x => x.name.toLowerCase().includes(caseInsensitiveName))
  }

  // Sort exercises by case-insensitive name
  return exercises
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    .slice(pageNum * perPage, (pageNum + 1) * perPage)
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
    .then((validAttrs) => db.exercises.add(validAttrs))
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
