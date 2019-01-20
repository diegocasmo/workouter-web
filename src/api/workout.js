import connection from './db'
import {string, number, array, object, mixed} from 'yup'
import {transformYupToFormikError} from './utils/error-transform'
import {trimmedMsg, requiredMsg, numTypeMsg, positiveNumMsg} from './utils/error-message'
import {UNITS} from './unit'

// Workout setup details schema
export const WorkoutSetupSchema = object().shape({
  name: string()
          .trim(trimmedMsg('Name')).strict()
          .required(requiredMsg('Name')),
  rounds: number(numTypeMsg('Rounds'))
            .positive(positiveNumMsg('Rounds'))
            .required(requiredMsg('Rounds')),
  restTimePerRound: number(numTypeMsg('Rest time per round'))
                      .positive(positiveNumMsg('Rest time per round'))
                      .required(requiredMsg('Rest time per round')),
  restTimePerExercise: number(numTypeMsg('Rest time per exercise'))
                      .positive(positiveNumMsg('Rest time per exercise'))
                      .required(requiredMsg('Rest time per exercise')),
})

// A workout schema
export const WorkoutSchema = object()
  .concat(WorkoutSetupSchema)
  .shape({
    exercises: array().of(object().shape({
        name: string()
                .trim(trimmedMsg('Exercise name')).strict()
                .required(requiredMsg('Exercise name')),
        quantity: number(numTypeMsg('Quantity'))
                    .typeError(numTypeMsg('Quantity'))
                    .positive(positiveNumMsg('Quantity'))
                    .required(requiredMsg('Quantity')),
        quantityUnit: string()
                        .trim(trimmedMsg('Quantity unit')).strict()
                        .required(requiredMsg('Quantity unit')),
        weight: number(numTypeMsg('Weight'))
                  .typeError(numTypeMsg('Weight'))
                  .min(0, 'Weight must be at least 0')
                  .required(requiredMsg('Weight')),
        weightUnit: mixed().oneOf([UNITS.KG.value])
                      .required(requiredMsg('Weight unit')),
      })
    ).required('A workout must have at least one exercise')
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
