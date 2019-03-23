import connection from '../db'
import {exercises} from './exercises.json'
import {workouts} from './workouts.json'

// Seed the database with sample workouts and exercises
export async function seedDatabase(db = connection) {
  try {
    return Promise.all([createExercises(db), createWorkouts(db)])
  } catch (err) {
    console.error(`Unable to create database seed: ${err.message}`)
  }
}

// Insert a bulk of sample exercises in DB. Return the number of inserted exercises if successful
export async function createExercises(db = connection) {
  return db.exercises.bulkAdd(exercises.map(x => ({name: x})))
}

// Insert a bulk of sample workouts in DB. Return the number of inserted workouts if successful
export async function createWorkouts(db = connection) {
  return db.workouts.bulkAdd(workouts)
}
