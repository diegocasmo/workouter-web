// Seed the database with sample workouts and exercises
export function seedDatabase(db) {
  return createUnits(db)
    .then(() => createExercises(db))
    .then(() => createWorkout(db));
}

// Create sample units
export function createUnits(db) {
  return db.units.bulkAdd([{name: 'reps'}, {name: 'sec'}]);
}

// Create sample exercises
export function createExercises(db) {
  return db.units.toArray()
    .then(([reps, sec]) => {
      return db.exercises.bulkAdd([
        {name: 'Burpees', unitId: reps.id},
        {name: 'Push Ups', unitId: reps.id},
        {name: 'Squats', unitId: reps.id},
        {name: 'Jumping Jacks', unitId: sec.id}
      ]);
    })
}

// Create a sample workout
export function createWorkout(db) {
  return db.exercises.toArray()
    .then((res) => Promise.all(res.map((x) => x.includeUnit())))
    .then(([burpess, pushUps, squats, jumpingJacks]) => {
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
    });
}
