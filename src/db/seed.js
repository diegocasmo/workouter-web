// Seed the database with sample workouts and exercises
export function seedDatabase(db) {
  return createMeasurements(db)
    .then(() => createExercises(db));
}

// Create sample exercise measurements
export function createMeasurements(db) {
  return db.measurements.bulkAdd([{name: 'reps'}, {name: 'time'}]);
}

// Create sample exercises
export function createExercises(db) {
  return Promise.all([
    db.measurements.where({name: 'reps'}).first(),
    db.measurements.where({name: 'time'}).first()
  ])
  .then(([reps, time]) =>
    db.exercises.bulkAdd([
      {measurementId: reps.id, name: 'Burpees'},
      {measurementId: reps.id, name: 'Push Ups'},
      {measurementId: reps.id, name: 'Squats'},
      {measurementId: time.id, name: 'Jumping Jacks'}
    ])
  );
}
