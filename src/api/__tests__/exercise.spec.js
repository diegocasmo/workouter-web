import db, {clearDb} from '../../db-mock'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {
  validateExercise, fetchExercises, getExercise, createExercise, deleteExercise,
  updateExercise
} from '../exercise'

describe('Exercise', () => {

  beforeEach(() => (db.exercises.bulkAdd(Factory.buildList('exercise', 3))))

  afterEach(() => (clearDb(db)))

  it('fetchExercises()', () => {
    return fetchExercises(db)
      .then((res) => expect(res.length).to.be.equal(3))
  })

  describe('validateExercise()', () => {

    it('returns the exercise if valid', () => {
      const attrs = Factory.build('exercise', {}, {except: ['id']})
      return validateExercise(attrs)
        .then((res) => expect(res).to.be.eql(attrs))
    })

    it('returns an error if an exercise doesn\'t have a name', () => {
      const invalidAttrs = Factory.build('exercise', {}, {except: ['id', 'name']})
      return validateExercise(invalidAttrs)
        .catch((errors) => expect(errors.name).to.be.equal('Name is required'))
    })
  })

  it('getExercise()', () => {
    return db.exercises.toArray()
      .then(([exercise]) => {
        return getExercise(exercise.id, db)
          .then((res) => expect(res).to.be.eql(res))
      })
  })

  describe('createExercise()', () => {

    it('creates a valid exercise in DB', () => {
      const attrs = Factory.build('exercise', {}, {except: ['id']})
      return createExercise(attrs, db)
        .then((res) => expect(attrs).to.be.eql(res))
    })

    it('doesn\'t allow to create an exercise with invalid attrs', () => {
      const invalidAttrs = Factory.build('exercise', {}, {except: ['id', 'name']})
      return createExercise(invalidAttrs, db)
        .catch((errors) => expect(errors.name).to.be.equal('Name is required'))
    })
  })

  describe('deleteExercise()', () => {
    it('deletes an existing exercise', () => {
      return db.exercises.toArray()
        .then(([exercise, ...remaining]) => {
          return deleteExercise(exercise.id, db)
            // One exercise was deleted
            .then((res) => expect(res).to.be.equal(1))
            .then(() => db.exercises.toArray())
            // The remaining exercises are still there
            .then((res) => expect(res).to.be.lengthOf(remaining.length))
        })
    })

    it('does not delete any record if exercise doesn\'t exist', () => {
      return db.exercises.toArray()
        .then((all) => {
          return deleteExercise(-1, db)
            // No exercise was deleted
            .then((res) => expect(res).to.be.equal(0))
            .then(() => db.exercises.toArray())
            // All exercises are still there
            .then((res) => expect(res).to.be.lengthOf(all.length))
        })
    })
  })

  describe('updateExercise()', () => {
    it('updates an exercise with valid attrs', () => {
      return db.exercises.toArray()
        .then(([prevExercise]) => {
          // Set a few attributes with valid values
          const attrs = {
            ...prevExercise,
            name: 'Foo'
          }
          return updateExercise(attrs, db)
            .then((nextExercise) => {
              // Verify exercise was successfully updated in DB
              expect(nextExercise.id).to.be.equal(prevExercise.id)
              expect(nextExercise.name).to.be.equal(attrs.name)
            })
        })
    })

    it('doesn\'t update an exercise with invalid attrs', () => {
      return db.exercises.toArray()
        .then(([exercise]) => {
          // Set a few attributes with INvalid values
          return {
            ...exercise,
            name: ''
          }
        })
        .then((attrs) => updateExercise(attrs, db))
        // A an error of type required is expected
        .catch((errors) => expect(errors.name).to.be.equal('Name is required'))
    })
  })
})
