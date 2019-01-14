import connection from './db'

// Seed the database with sample workouts and exercises
export function seedDatabase(db = connection) {
  return createExercises(db)
    .then(() => createWorkout(db))
}

// Create sample exercises
export function createExercises(db = connection) {
  return db.exercises.bulkAdd([
    {name: 'Burpees'},
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
