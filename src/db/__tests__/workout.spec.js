import db from '../db';
import {expect} from 'chai';
import {seedDatabase} from '../seed';
import {fetch} from '../workout';

describe('Workout', () => {

  beforeEach(() => {
    return seedDatabase(db);
  });

  afterEach(() => {
    return db.units.clear()
      .then(() => db.exercises.clear())
      .then(() => db.workouts.clear());
  });

  it('fetch()', () => {
    return fetch(db)
      .then((res) => expect(res.length).to.be.equal(1));
  });
})
