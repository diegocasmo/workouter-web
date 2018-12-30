import Dexie from 'dexie';
import {expect} from 'chai';
import {getSchema,getDbName} from '../schema';
import {createMeasurements, createExercises} from '../seed';

describe('Seed', () => {

  let db;
  beforeEach(() => {
    db = new Dexie(getDbName(), {
      indexedDB: require('fake-indexeddb'),
      IDBKeyRange: require('fake-indexeddb/lib/FDBKeyRange')
    });
    db.version(1).stores(getSchema());
  });

  afterEach(() => {
    return db.measurements.clear()
      .then(() => db.exercises.clear());
  });

  it('createMeasurements()', () => {
    return createMeasurements(db)
      .then((res) => expect(res).to.be.equal(2))
      .then(() => db.measurements.toArray())
      .then((measurements) => {
        expect(measurements[0].name).to.be.equal('reps');
        expect(measurements[1].name).to.be.equal('time');
      });
  });

  it('createExercises()', () => {
    return createMeasurements(db)
      .then(() => createExercises(db))
      .then((res) => expect(res).to.be.equal(4))
      .then(() => db.exercises.toArray())
      .then((exercises) => {
        expect(exercises[0].name).to.be.equal('Burpees');
        expect(exercises[1].name).to.be.equal('Push Ups');
        expect(exercises[2].name).to.be.equal('Squats');
        expect(exercises[3].name).to.be.equal('Jumping Jacks');
        return exercises;
      })
      .then((exercises) => {
        db.measurements.toArray()
          .then((measurements) => {
            expect(exercises[0].measurementId).to.be.equal(measurements[0].id);
            expect(exercises[1].measurementId).to.be.equal(measurements[0].id);
            expect(exercises[2].measurementId).to.be.equal(measurements[0].id);
            expect(exercises[3].measurementId).to.be.equal(measurements[1].id);
          });
      });
  });
})
