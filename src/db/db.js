import Dexie from 'dexie';
import {seedDatabase} from './seed';

const db = new Dexie('WorkouterDb');

db.version(1).stores({
  'units': '++id,&name',
  'exercises': '++id,unitId',
  'workouts': '++id,&name'
});

let Unit = db.units.defineClass({
  id: Number,
  name: String
});

let Exercise = db.exercises.defineClass({
  id: Number,
  name: String,
  unit: Unit
});

let Workout = db.workouts.defineClass({
  id: Number,
  rounds: Number,
  restTimePerRound: Number,
  restTimePerExercise: Number,
  exercises: [Exercise]
});

Exercise.prototype.includeUnit = function () {
  return db.units.where({id: this.unitId})
    .first((unit) => ({...this, unit: unit }));
};

// Seed the database with sample workouts and exercises
db.on('populate', () => seedDatabase(db));

export default db;
