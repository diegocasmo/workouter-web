import db, {clearDb} from '../../db-mock'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {
  fetchWorkouts, getWorkout, validateWorkout, createWorkout,
  deleteWorkout, updateWorkout
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

  describe('getWorkout()', () => {

    it('returns workout if it exists', async () => {
      const [workout] = await db.workouts.toArray()
      const res = await getWorkout(workout.id, db)
      expect(res).to.be.eql(workout)
    })

    it('returns an error if workout doens\'t exist', async () => {
      try {
        await getWorkout(-1, db)
        expect(true).to.be.false // force catch to always be executed
      } catch(error) {
        expect(error.message).to.be.equal('Workout -1 doesn\'t exist')
      }
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

    it('returns an error if workout doesn\'t exist', async () => {
      try {
        await deleteWorkout(-1, db)
        expect(true).to.be.false // force catch to always be executed
      } catch(error) {
        expect(error.message).to.be.equal('Unable to delete workout -1')
      }
    })
  })

  describe('updateWorkout()', () => {
    it('updates an workout with valid attrs', async () => {
      const [prevWorkout] = await db.workouts.toArray()

      // Update a few attributes with valid values
      const attrs = {...prevWorkout, name: 'Foo'}
      const nextExercise = await updateWorkout(attrs, db)

      // Verify workout was successfully updated in DB
      expect(nextExercise.id).to.be.equal(prevWorkout.id)
      expect(nextExercise.name).to.be.equal(attrs.name)
    })

    it('doesn\'t update an workout with invalid attrs', async () => {
      const [workout] = await db.workouts.toArray()

      // Update a few attributes with INvalid values
      const attrs = {...workout, name: ''}
      try {
        await updateWorkout(attrs, db)
        expect(true).to.be.false // force catch to always be executed
      } catch(errors) {
        // A an error of type required is expected
        expect(errors.name).to.be.equal('Name is required')
      }
    })
  })
})
