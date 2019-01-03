import connection from '../db'
import * as yup from 'yup'

// An exercise schema
export const ExerciseSchema = yup.object().shape({
  name: yup.string().trim()
    .required('Name is required'),
  measurement: yup.object().shape({
    name: yup.string().trim()
            .required('Measurement name is required')
  })
})

// Validate an exercise attributes. Return a Promise with a truth value if valid,
// an error object otherwise
export function validateExercise(attrs) {
  return ExerciseSchema.validate(cleanseExerciseAttrs(attrs))
}

// Return an exercise with only allowed attrs
export function cleanseExerciseAttrs(attrs) {
  return ExerciseSchema.cast(attrs, {stripUnknown: true})
}

// Return an array of exercises
export function fetchExercises(db = connection) {
  return db.exercises.toArray()
}

// Returns a created exercise in DB if successful, a rejected Promise with an
// object of errors otherwise
export function createExercise(attrs, db = connection) {
  return validateExercise(attrs)
    .then((test) => db.exercises.add(cleanseExerciseAttrs(attrs)))
    .then((id) => db.exercises.get(id))
}
