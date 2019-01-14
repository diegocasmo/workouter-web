import db from '../../../db-mock'
import {expect} from 'chai'
import {seedDatabase} from '../../seed'
import {fetchWorkouts} from '../workout'

describe('Workout', () => {

  beforeEach(() => { return seedDatabase(db) })

  afterEach(() => {
    return db.exercises.clear()
      .then(() => db.workouts.clear())
  })

  it('fetchWorkouts()', () => {
    return fetchWorkouts(db)
      .then((res) => expect(res.length).to.be.equal(1))
  })
})
