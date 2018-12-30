import Dexie from 'dexie';
import relationships from 'dexie-relationships'

const db = new Dexie('WorkouterDb', {addons: [relationships]});

db.version(1).stores({
  'measurements': '++id, &name',
  'exercises': '++id, measurementId -> measurements.id, &name',
  'workouts': '++id, &name', // rounds,restTimePerRound,restTimePerExercise
  'workoutExercises': '++id, workoutId -> workouts.id,exerciseId -> exercises.id', // quantity
});

db.on('populate', function() {
  db.measurements.bulkAdd([{name: 'reps'}, {name: 'time'}]);
});

export default db;
