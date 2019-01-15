import connection from './db'
import {UNITS} from './unit'

// Seed the database with sample workouts and exercises
export function seedDatabase(db = connection) {
  return createExercises(db)
    .then(() => createWorkout(db))
}

// Create sample exercises
export function createExercises(db = connection) {
  return db.exercises.bulkAdd([
    {name: 'Running'},
    {name: 'Push Ups'},
    {name: 'Squats'},
    {name: 'Jumping Jacks'}
  ])
}

// Create a sample workout
export function createWorkout(db = connection) {
  return db.exercises.toArray()
    .then((exercises) => {
      // Delete unwanted attributes
      const unwantedAttrs = ['id', 'createdAt', 'updatedAt']
      exercises.forEach((x) => {
        unwantedAttrs.forEach((attr) => delete x[attr])
      })

      // Add workout
      const [running, pushUps, squats, jumpingJacks] = exercises
      return db.workouts.add({
        'name': 'Full Body I',
        'rounds': 4,
        'restTimePerRound': 60, // Assumed to be in seconds
        'restTimePerExercise': 20, // Assumed to be in seconds
        'exercises': [
          {
            ...running,
            quantity: 0.2,
            unit: UNITS.KM.value,
            weight: null
          },
          {
            ...pushUps,
            quantity: 12,
            unit: UNITS.REPS.value,
            weight: null
          },
          {
            ...squats,
            quantity: 15,
            unit: UNITS.REPS.value,
            weight: 15
          },
          {
            ...jumpingJacks,
            quantity: 45,
            unit: UNITS.SECONDS.value,
            weight: null
          }
        ]
      })
    })
}
