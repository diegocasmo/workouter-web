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
    {name: 'Push Ups'},
    {name: 'Running'},
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
      const [pushUps, running, squats, jumpingJacks] = exercises
      return db.workouts.add({
        'name': 'Full Body I',
        'rounds': 4,
        'restTimePerRound': 60, // Assumed to be in seconds
        'restTimePerExercise': 20, // Assumed to be in seconds
        'exercises': [
          {
            ...running,
            quantity: 0.2,
            quantityUnit: UNITS.KM.value,
            weight: 0,
            weightUnit: UNITS.KG.value
          },
          {
            ...pushUps,
            quantity: 12,
            quantityUnit: UNITS.REPS.value,
            weight: 0,
            weightUnit: UNITS.KG.value
          },
          {
            ...squats,
            quantity: 15,
            quantityUnit: UNITS.REPS.value,
            weight: 15,
            weightUnit: UNITS.KG.value
          },
          {
            ...jumpingJacks,
            quantity: 45,
            quantityUnit: UNITS.SECONDS.value,
            weight: 0,
            weightUnit: UNITS.KG.value
          }
        ]
      })
    })
}
