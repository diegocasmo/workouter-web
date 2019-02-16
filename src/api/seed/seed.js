import connection from '../db'
import {UNITS} from '../unit'
import {exercises} from './exercises.json'

// Seed the database with sample workouts and exercises
export async function seedDatabase(db = connection) {
  try {
    await createExercises(db)
    await createWorkout(db)
  } catch (err) {
    console.error(`Unable to create database seed: ${err.message}`)
  }
}

// Insert a bulk of sample exercises in DB. Return the number of inserted exercises if successful
export async function createExercises(db = connection) {
  return db.exercises.bulkAdd(exercises.map(x => ({name: x})))
}

// Create a sample workout in DB, returns its ID if successful, a rejected Promise otherwise
export async function createWorkout(db = connection) {
  // Find workout exercises in DB
  let workoutExercises =
    await Promise.all([
      db.exercises.where({name: 'Burpees'}).first(),
      db.exercises.where({name: 'Squat jumps'}).first(),
      db.exercises.where({name: 'Wide push ups'}).first(),
      db.exercises.where({name: 'High knees'}).first(),
      db.exercises.where({name: 'Hand stand wall assisted'}).first()
    ])

  // Remove unwanted attributes
  workoutExercises.forEach((x) => {
    ['id', 'createdAt', 'updatedAt'].forEach((attr) => delete x[attr])
  })

  // Create sample workout
  const [burpees, squatJumps, pushUps, highKnees, handStand] = workoutExercises
  const noWeight = {weight: 0, weightUnit: UNITS.KG.value}
  return db.workouts.add({
    'name': 'Full Body',
    'rounds': 4,
    'restTimePerRound': 60, // Assumed to be in seconds
    'restTimePerExercise': 20, // Assumed to be in seconds
    'exercises': [
      {...burpees, ...noWeight, quantity: 10, quantityUnit: UNITS.REPS.value},
      {...squatJumps, ...noWeight, quantity: 10, quantityUnit: UNITS.REPS.value},
      {...pushUps, ...noWeight, quantity: 12, quantityUnit: UNITS.REPS.value},
      {...highKnees, ...noWeight, quantity: 20, quantityUnit: UNITS.SECONDS.value},
      {...handStand, ...noWeight, quantity: 10, quantityUnit: UNITS.SECONDS.value}
    ]
  })
}
