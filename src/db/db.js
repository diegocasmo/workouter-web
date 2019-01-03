import Dexie from 'dexie';
import {seedDatabase} from './seed';

/**
Model: Measurement
  - id
  - &name
Model: Exercise
  - id
  - name
  - measurement: {}
Model: Workout
  - id
  - name
  - rounds
  - restTimePerRound
  - restTimePerExercise
  - exercises: [{}]
*/

// Initialize Dexie DB
const db = new Dexie('WorkouterDb');

// Specify this DB's version schema, which only defines indexed keys
// The & sign means the attribute must be unique across its table
db.version(1).stores({
  'measurements': '++id,&name',
  'exercises': '++id,name',
  'workouts': '++id,&name'
});

// Seed the database with sample workouts and exercises
db.on('populate', () => seedDatabase(db));

export default db;
