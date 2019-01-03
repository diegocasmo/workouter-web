import db from '../../../db-mock';
import {expect} from 'chai';
import {seedDatabase} from '../../seed';
import {fetch} from '../exercise';

describe('Exercise', () => {

  beforeEach(() => { return seedDatabase(db) });

  afterEach(() => {
    return db.measurements.clear()
      .then(() => db.exercises.clear())
      .then(() => db.workouts.clear());
  });

  it('fetch()', () => {
    return fetch(db)
      .then((res) => {
        expect(res.length).to.be.equal(4);

        // Check exercises a self-contained measurement with no id
        res.forEach((exercise) => {
          expect(exercise.measurement).to.be.an('object');
          expect(exercise.measurement.id).to.be.equal(undefined);
        });
      });
  });
})
