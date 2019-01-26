import db, {clearDb} from '../../db-mock'
import {Factory} from 'rosie'
import faker from 'faker'
import {expect} from 'chai'
import {
  fetchWorkouts, validateWorkout, createWorkout, deleteWorkout
} from '../workout'

describe('Workout', () => {

  beforeEach(() => (db.workouts.bulkAdd(Factory.buildList('workout', 3))))

  afterEach(() => (clearDb(db)))

  it('fetchWorkouts()', () => {
    return fetchWorkouts(db)
      .then((res) => expect(res.length).to.be.equal(3))
  })

  describe('validateWorkout()', () => {

    // Each of the following attributes are required for a workout
    [
      'name',
      'rounds',
      'restTimePerRound',
      'restTimePerExercise',
      'exercises',
      'exercises[0].name',
      'exercises[0].quantity',
      'exercises[0].quantityUnit',
      'exercises[0].weight',
      'exercises[0].weightUnit'
    ].forEach((x) => {
      it(`does not allow to create a workout without '${x}'`, () => {
        const attrs = Factory.build('workout', {}, {except: ['id', x]})
        return validateWorkout(attrs)
          .then(() => expect(true).to.be.false) // force catch to always be executed
          .catch((errors) => expect(errors[x]).to.be.a('string'))
      })
    })

    it('returns the workout if valid', () => {
      const attrs = Factory.build('workout', {}, {except: ['id']})
      return validateWorkout(attrs)
        .then((res) => expect(res).to.be.eql(attrs))
    })
  })

  describe('createWorkout()', () => {

    it('creates a valid workout in DB', () => {
      const attrs = Factory.build('workout', {}, {except: ['id']})
      return createWorkout(attrs, db)
        .then((res) => expect(attrs).to.be.eql(res))
    })

    it('doesn\'t allow to create an workout with invalid attrs', () => {
      const invalidAttrs = Factory.build('workout', {}, {except: ['id', 'name']})
      return createWorkout(invalidAttrs, db)
        .then(() => expect(true).to.be.false) // force catch to always be executed
        .catch((errors) => expect(errors.name).to.be.equal('Name is required'))
    })
  })

  describe('deleteWorkout()', () => {
    it('deletes an existing workout', () => {
      return db.workouts.toArray()
        .then(([workout, ...remaining]) => {
          return deleteWorkout(workout.id, db)
            // One workout was deleted
            .then((res) => expect(res).to.be.equal(1))
            .then(() => db.workouts.toArray())
            // The remaining workouts are still there
            .then((res) => expect(res).to.be.lengthOf(remaining.length))
        })
    })

    it('doesn\'t delete any record if workout id doesn\'t exist', () => {
      return db.workouts.toArray()
        .then((all) => {
          return deleteWorkout(-1, db)
            // No workout was deleted
            .then((res) => expect(res).to.be.equal(0))
            .then(() => db.workouts.toArray())
            // All workouts are still there
            .then((res) => expect(res).to.be.lengthOf(all.length))
        })
    })
  })
})
