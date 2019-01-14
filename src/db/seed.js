import connection from './db'

// Seed the database with sample workouts and exercises
export function seedDatabase(db = connection) {
  return createMeasurements(db)
    .then(() => createExercises(db))
    .then(() => createWorkout(db))
}

// Create default measurements
export function createMeasurements(db = connection) {
  return db.measurements.bulkAdd([
    {name: 'reps'},
    {name: 'time'}
  ])
}

// Create sample exercises
export function createExercises(db = connection) {
  return db.measurements.toArray()
    .then((measurements) => {
      // Delete unwanted attributes
      const unwantedAttrs = ['id', 'createdAt', 'updatedAt']
      measurements.forEach((x) => {
        unwantedAttrs.forEach((attr) => delete x[attr])
      })

      // Add exercises
      const [reps, time] = measurements
      return db.exercises.bulkAdd([
        {name: 'Burpees', measurement: reps},
        {name: 'Push Ups', measurement: reps},
        {name: 'Squats', measurement: reps},
        {name: 'Jumping Jacks', measurement: time}
      ])
    })
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
      const [burpess, pushUps, squats, jumpingJacks] = exercises
      return db.workouts.add({
        'name': 'Full Body I',
        'rounds': 4,
        'restTimePerRound': 60,
        'restTimePerExercise': 20,
        'exercises': [
          {...burpess, quantity: 12},
          {...pushUps, quantity: 15},
          {...squats, quantity: 20},
          {...jumpingJacks, quantity: 45}
        ]
      })
    })
}
