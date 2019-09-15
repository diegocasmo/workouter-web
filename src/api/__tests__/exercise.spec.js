import db, { clearDb } from '../../test-utils/db-mock'
import { Factory } from 'rosie'
import { expect } from 'chai'
import {
  validateExercise,
  fetchExercises,
  getExercise,
  createExercise,
  deleteExercise,
  updateExercise,
} from '../exercise'

describe('Exercise', () => {
  afterEach(async () => clearDb(db))

  describe('fetchExercises()', () => {
    it('returns paginated exercises', async () => {
      // Retrieve the 20 items paginated into 2 pages
      await db.exercises.bulkAdd(
        Factory.buildList('exercise', 20, {}, { except: ['id'] })
      )
      const firstPage = await fetchExercises({ pageNum: 0, perPage: 10, db })
      const secondPage = await fetchExercises({ pageNum: 1, perPage: 10, db })

      // Verify each page contains 10 elements
      expect(firstPage.length).to.be.equal(10)
      expect(secondPage.length).to.be.equal(10)

      // Verify pages contain exercises sorted by ascending name
      const allExercises = await db.exercises.toArray()
      const sortedExercises = [...allExercises].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
      expect(firstPage).to.be.eql(sortedExercises.slice(0, 10))
      expect(secondPage).to.be.eql(sortedExercises.slice(10))
    })

    it('returns paginated exercises filtered by name', async () => {
      // Create a few exercises with similar names to make sure the query returns multiple results
      const names = ['a', 'aa', 'aaa', 'aaaa', 'aaaaa']
      let exercises = Factory.buildList('exercise', 5, {}, { except: ['id'] })
      exercises.forEach((_, i) => {
        exercises[i].name = names[i]
      })
      await db.exercises.bulkAdd(exercises)

      // Retrieve paginated exercises filtered by their names
      const firstPage = await fetchExercises({
        name: 'a',
        pageNum: 0,
        perPage: 3,
        db,
      })
      const secondPage = await fetchExercises({
        name: 'a',
        pageNum: 1,
        perPage: 3,
        db,
      })

      // Check every page contains the right elements
      const allExercises = await db.exercises.toArray()
      expect(firstPage).to.be.eql(allExercises.slice(0, 3))
      expect(secondPage).to.be.eql(allExercises.slice(3))
    })
  })

  describe('validateExercise()', () => {
    it('returns the exercise if valid', () => {
      const attrs = Factory.build('exercise', {}, { except: ['id'] })
      return validateExercise(attrs).then(res => expect(res).to.be.eql(attrs))
    })

    it("returns an error if an exercise doesn't have a name", () => {
      const invalidAttrs = Factory.build(
        'exercise',
        {},
        { except: ['id', 'name'] }
      )
      return validateExercise(invalidAttrs).catch(errors =>
        expect(errors.name).to.be.equal('Name is required')
      )
    })
  })

  describe('getExercise()', () => {
    beforeEach(async () =>
      db.exercises.bulkAdd(Factory.buildList('exercise', 3))
    )

    it('returns exercise if it exists', async () => {
      const [exercise] = await db.exercises.toArray()
      const res = await getExercise(exercise.id, db)
      expect(res).to.be.eql(exercise)
    })

    it("returns an error if exercise doens't exist", async () => {
      try {
        await getExercise(-1, db)
        expect(true).to.be.false // force catch to always be executed
      } catch (error) {
        expect(error.message).to.be.equal("Exercise -1 doesn't exist")
      }
    })
  })

  describe('createExercise()', () => {
    beforeEach(async () =>
      db.exercises.bulkAdd(Factory.buildList('exercise', 3))
    )

    it('creates a valid exercise in DB', () => {
      const attrs = Factory.build('exercise', {}, { except: ['id'] })
      return createExercise(attrs, db).then(res => expect(attrs).to.be.eql(res))
    })

    it("doesn't allow to create an exercise with invalid attrs", () => {
      const invalidAttrs = Factory.build(
        'exercise',
        {},
        { except: ['id', 'name'] }
      )
      return createExercise(invalidAttrs, db).catch(errors =>
        expect(errors.name).to.be.equal('Name is required')
      )
    })
  })

  describe('deleteExercise()', () => {
    beforeEach(async () =>
      db.exercises.bulkAdd(Factory.buildList('exercise', 3))
    )

    it('deletes an existing exercise', () => {
      return db.exercises.toArray().then(([exercise, ...remaining]) => {
        return (
          deleteExercise(exercise.id, db)
            // One exercise was deleted
            .then(res => expect(res).to.be.equal(1))
            .then(() => db.exercises.toArray())
            // The remaining exercises are still there
            .then(res => expect(res).to.be.lengthOf(remaining.length))
        )
      })
    })

    it("returns an error if exercise doesn't exist", async () => {
      try {
        await deleteExercise(-1, db)
        expect(true).to.be.false // force catch to always be executed
      } catch (error) {
        expect(error.message).to.be.equal('Unable to delete exercise -1')
      }
    })
  })

  describe('updateExercise()', () => {
    beforeEach(async () =>
      db.exercises.bulkAdd(Factory.buildList('exercise', 3))
    )

    it('updates an exercise with valid attrs', () => {
      return db.exercises.toArray().then(([prevExercise]) => {
        // Set a few attributes with valid values
        const attrs = {
          ...prevExercise,
          name: 'Foo',
        }
        return updateExercise(attrs, db).then(nextExercise => {
          // Verify exercise was successfully updated in DB
          expect(nextExercise.id).to.be.equal(prevExercise.id)
          expect(nextExercise.name).to.be.equal(attrs.name)
        })
      })
    })

    it("doesn't update an exercise with invalid attrs", () => {
      return (
        db.exercises
          .toArray()
          .then(([exercise]) => {
            // Set a few attributes with INvalid values
            return {
              ...exercise,
              name: '',
            }
          })
          .then(attrs => updateExercise(attrs, db))
          // A an error of type required is expected
          .catch(errors => expect(errors.name).to.be.equal('Name is required'))
      )
    })
  })
})
