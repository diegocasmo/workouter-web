import connection from './db'
import { string, number, array, object, mixed } from 'yup'
import { transformYupToFormikError } from './utils/error-transform'
import {
  requiredMsg,
  numTypeMsg,
  positiveNumMsg,
  atLeastNumMsg,
} from './utils/error-message'
import { UNITS } from './unit'

// Workout setup details schema
export const WorkoutSetupSchema = object().shape({
  name: string()
    .trim()
    .required(requiredMsg('Name')),
  rounds: number(numTypeMsg('Rounds'))
    .positive(positiveNumMsg('Rounds'))
    .required(requiredMsg('Rounds')),
  restTimePerRound: number(numTypeMsg('Rest time per round'))
    .min(0, atLeastNumMsg('Rest time per round', 0))
    .required(requiredMsg('Rest time per round')),
  restTimePerExercise: number(numTypeMsg('Rest time per exercise'))
    .min(0, atLeastNumMsg('Rest time per exercise', 0))
    .required(requiredMsg('Rest time per exercise')),
})

// A workout schema
export const WorkoutSchema = object()
  .concat(WorkoutSetupSchema)
  .shape({
    exercises: array()
      .of(
        object().shape({
          name: string()
            .trim()
            .required(requiredMsg('Exercise name')),
          quantity: number(numTypeMsg('Quantity'))
            .typeError(numTypeMsg('Quantity'))
            .positive(positiveNumMsg('Quantity'))
            .required(requiredMsg('Quantity')),
          quantityUnit: string()
            .trim()
            .required(requiredMsg('Quantity unit')),
          weight: number(numTypeMsg('Weight'))
            .typeError(numTypeMsg('Weight'))
            .min(0, atLeastNumMsg('Weight', 0))
            .required(requiredMsg('Weight')),
          weightUnit: mixed()
            .oneOf([UNITS.KG.value])
            .required(requiredMsg('Weight unit')),
        })
      )
      .required('A workout must have at least one exercise'),
  })

// Validate a workout attributes. Return a resolved Promise with with the
// valid attrs, a Rails-like error object otherwise
export async function validateWorkout(attrs) {
  return WorkoutSchema.validate(attrs).catch(yupError =>
    Promise.reject(transformYupToFormikError(yupError))
  )
}

// Return a paginated array of workouts sorted by ascending name, optionally filtered by
// workouts that have a name which includes the specified name query (case-insensitive)
export async function fetchWorkouts(opts = {}) {
  const { name = null, pageNum = 0, perPage = 10, db = connection } = opts

  // Perform case-insensitive search if a name query is provided
  const caseInsensitiveName = name ? name.toLowerCase() : null

  // Return paginated results filtered by an optional name query
  // Note: Dexie doesn't support case-insensitive `orderBy`. As a result,
  // all workouts are retrieved using `toArray` in order to use native
  // Array methods
  let workouts = await db.workouts.toArray()
  if (caseInsensitiveName) {
    workouts = workouts.filter(x =>
      x.name.toLowerCase().includes(caseInsensitiveName)
    )
  }

  // Sort workouts by case-insensitive name
  return workouts
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    .slice(pageNum * perPage, (pageNum + 1) * perPage)
}

// Return a workout from DB if it exists, otherwise reject with an error
export async function getWorkout(id, db = connection) {
  const workout = await db.workouts.get(id)
  return workout
    ? workout
    : Promise.reject(new Error(`Workout ${id} doesn't exist`))
}

// Returns a created workout in DB if successful, a rejected Promise with a Rails-like
// object of errors otherwise
export function createWorkout(attrs, db = connection) {
  return validateWorkout(attrs)
    .then(validAttrs => db.workouts.add(validAttrs))
    .then(id => db.workouts.get(id))
}

// Delete a workout using its id from DB. Return a Promise with the number
// of elements successfully deleted from DB
export async function deleteWorkout(id, db = connection) {
  const deleted = await db.workouts.where({ id }).delete()
  return deleted
    ? deleted
    : Promise.reject(new Error(`Unable to delete workout ${id}`))
}

// Returns an updated workout from DB, a rejected Promise with a Rails-like
// object of errors otherwise
export async function updateWorkout({ id, ...attrs }, db = connection) {
  await validateWorkout(attrs)
  await db.workouts.update(id, attrs)
  return db.workouts.get(id)
}
