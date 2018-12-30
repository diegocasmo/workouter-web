// import db from '../db';
import Dexie from 'dexie';
import {expect} from 'chai';
import {createUnits, createExercises, createWorkout} from '../seed';

describe('Seed', () => {

  let db;
  beforeEach(() => {
    db = new Dexie('WorkouterDbTest', {
      indexedDB: require('fake-indexeddb'),
      IDBKeyRange: require('fake-indexeddb/lib/FDBKeyRange')
    });

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
  });

  afterEach(() => {
    return db.units.clear()
      .then(() => db.exercises.clear())
      .then(() => db.workouts.clear());
  });

  it('createUnits()', () => {
    return createUnits(db)
      .then(() => db.units.toArray())
      .then(([reps, sec]) => {
        expect(reps.name).to.be.equal('reps');
        expect(sec.name).to.be.equal('sec');
      });
  });

  it('createExercises()', () => {
    return createUnits(db)
      .then(() => createExercises(db))
      .then(() => db.exercises.toArray())
      .then((res) => Promise.all(res.map((x) => x.includeUnit())))
      .then(([burpess, pushUps, squats, jumpingJacks]) => {
        // Check name is correct
        expect(burpess.name).to.be.equal('Burpees');
        expect(pushUps.name).to.be.equal('Push Ups');
        expect(squats.name).to.be.equal('Squats');
        expect(jumpingJacks.name).to.be.equal('Jumping Jacks');
        // Check exercise unit is correct
        expect(burpess.unit.name).to.be.equal('reps');
        expect(pushUps.unit.name).to.be.equal('reps');
        expect(squats.unit.name).to.be.equal('reps');
        expect(jumpingJacks.unit.name).to.be.equal('sec');
      });
  });

  it('createWorkout()', () => {
    return createUnits(db)
      .then(() => createExercises(db))
      .then(() => createWorkout(db))
      .then(() => db.workouts.toArray())
      .then(([workout]) => {
        expect(workout.name).to.be.equal('Full Body I');
        expect(workout.rounds).to.be.equal(4);
        expect(workout.restTimePerRound).to.be.equal(60);
        expect(workout.restTimePerExercise).to.be.equal(20);
        expect(workout.exercises.length).to.be.equal(4);
      });
  });
})
