import db, { clearDb } from '../../test-utils/db-mock'
import { Factory } from 'rosie'
import { expect } from 'chai'
import {
  fetchWorkouts,
  getWorkout,
  validateWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from '../workout'

describe('Workout', () => {
  afterEach(() => clearDb(db))

  describe('fetchWorkouts()', () => {
    it('returns paginated workouts', async () => {
      // Retrieve the 20 items paginated into 2 pages
      await db.workouts.bulkAdd(
        Factory.buildList('workout', 20, {}, { except: ['id'] })
      )
      const firstPage = await fetchWorkouts({ pageNum: 0, perPage: 10, db })
      const secondPage = await fetchWorkouts({ pageNum: 1, perPage: 10, db })

      // Verify each page contains 10 elements
      expect(firstPage.length).to.be.equal(10)
      expect(secondPage.length).to.be.equal(10)

      // Verify pages contain workouts sorted by ascending name
      const allWorkouts = await db.workouts.toArray()
      const sortedWorkouts = [...allWorkouts].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
      expect(firstPage).to.be.eql(sortedWorkouts.slice(0, 10))
      expect(secondPage).to.be.eql(sortedWorkouts.slice(10))
    })

    it('returns paginated workouts filtered by name', async () => {
      // Create a few workouts with similar names to make sure the query returns multiple results
      const names = ['a', 'aa', 'aaa', 'aaaa', 'aaaaa']
      let workouts = Factory.buildList('workout', 5, {}, { except: ['id'] })
      workouts.forEach((_, i) => {
        workouts[i].name = names[i]
      })
      await db.workouts.bulkAdd(workouts)

      // Retrieve paginated workouts filtered by their names
      const firstPage = await fetchWorkouts({
        name: 'a',
        pageNum: 0,
        perPage: 3,
        db,
      })
      const secondPage = await fetchWorkouts({
        name: 'a',
        pageNum: 1,
        perPage: 3,
        db,
      })

      // Check every page contains the right elements
      const allWorkouts = await db.workouts.toArray()
      expect(firstPage).to.be.eql(allWorkouts.slice(0, 3))
      expect(secondPage).to.be.eql(allWorkouts.slice(3))
    })
  })

  describe('validateWorkout()', () => {
    // Each of the following attributes are required for a workout
    ;[
      'name',
      'rounds',
      'restTimePerRound',
      'restTimePerExercise',
      'exercises',
      'exercises[0].name',
      'exercises[0].quantity',
      'exercises[0].quantityUnit',
      'exercises[0].weight',
      'exercises[0].weightUnit',
    ].forEach(x => {
      it(`does not allow to create a workout without '${x}'`, () => {
        const attrs = Factory.build('workout', {}, { except: ['id', x] })
        return validateWorkout(attrs)
          .then(() => expect(true).to.be.false) // force catch to always be executed
          .catch(errors => expect(errors[x]).to.be.a('string'))
      })
    })

    it('returns the workout if valid', () => {
      const attrs = Factory.build('workout', {}, { except: ['id'] })
      return validateWorkout(attrs).then(res => expect(res).to.be.eql(attrs))
    })
  })

  describe('getWorkout()', () => {
    beforeEach(async () => db.workouts.bulkAdd(Factory.buildList('workout', 3)))

    it('returns workout if it exists', async () => {
      const [workout] = await db.workouts.toArray()
      const res = await getWorkout(workout.id, db)
      expect(res).to.be.eql(workout)
    })

    it("returns an error if workout doens't exist", async () => {
      try {
        await getWorkout(-1, db)
        expect(true).to.be.false // force catch to always be executed
      } catch (error) {
        expect(error.message).to.be.equal("Workout -1 doesn't exist")
      }
    })
  })

  describe('createWorkout()', () => {
    it('creates a valid workout in DB', () => {
      const attrs = Factory.build('workout', {}, { except: ['id'] })
      return createWorkout(attrs, db).then(res => expect(attrs).to.be.eql(res))
    })

    it("doesn't allow to create an workout with invalid attrs", () => {
      const invalidAttrs = Factory.build(
        'workout',
        {},
        { except: ['id', 'name'] }
      )
      return createWorkout(invalidAttrs, db)
        .then(() => expect(true).to.be.false) // force catch to always be executed
        .catch(errors => expect(errors.name).to.be.equal('Name is required'))
    })
  })

  describe('deleteWorkout()', () => {
    beforeEach(async () => db.workouts.bulkAdd(Factory.buildList('workout', 3)))

    it('deletes an existing workout', () => {
      return db.workouts.toArray().then(([workout, ...remaining]) => {
        return (
          deleteWorkout(workout.id, db)
            // One workout was deleted
            .then(res => expect(res).to.be.equal(1))
            .then(() => db.workouts.toArray())
            // The remaining workouts are still there
            .then(res => expect(res).to.be.lengthOf(remaining.length))
        )
      })
    })

    it("returns an error if workout doesn't exist", async () => {
      try {
        await deleteWorkout(-1, db)
        expect(true).to.be.false // force catch to always be executed
      } catch (error) {
        expect(error.message).to.be.equal('Unable to delete workout -1')
      }
    })
  })

  describe('updateWorkout()', () => {
    beforeEach(async () => db.workouts.bulkAdd(Factory.buildList('workout', 3)))

    it('updates an workout with valid attrs', async () => {
      const [prevWorkout] = await db.workouts.toArray()

      // Update a few attributes with valid values
      const attrs = { ...prevWorkout, name: 'Foo' }
      const nextExercise = await updateWorkout(attrs, db)

      // Verify workout was successfully updated in DB
      expect(nextExercise.id).to.be.equal(prevWorkout.id)
      expect(nextExercise.name).to.be.equal(attrs.name)
    })

    it("doesn't update an workout with invalid attrs", async () => {
      const [workout] = await db.workouts.toArray()

      // Update a few attributes with INvalid values
      const attrs = { ...workout, name: '' }
      try {
        await updateWorkout(attrs, db)
        expect(true).to.be.false // force catch to always be executed
      } catch (errors) {
        // A an error of type required is expected
        expect(errors.name).to.be.equal('Name is required')
      }
    })
  })
})
