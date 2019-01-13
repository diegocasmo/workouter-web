import db from '../../../db-mock'
import {expect} from 'chai'
import {seedDatabase} from '../../seed'
import {fetchMeasurements} from '../measurement'

describe('Measurement', () => {

  beforeEach(() => { return seedDatabase(db) })

  afterEach(() => {
    return db.measurements.clear()
      .then(() => db.exercises.clear())
      .then(() => db.workouts.clear())
  })

  it('fetchMeasurements()', () => {
    return fetchMeasurements(db)
      .then((res) => expect(res.length).to.be.equal(2))
  })
})
