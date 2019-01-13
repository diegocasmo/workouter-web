import db from '../../../db-mock'
import {expect} from 'chai'
import {seedDatabase} from '../../seed'
import {
  validateExercise, fetchExercises, getExercise, createExercise, deleteExercise,
  updateExercise
} from '../exercise'

describe('Exercise', () => {

  let validAttrs
  beforeEach(() => {
    validAttrs = {
      'name': 'Incline Push Ups',
      'measurement': {'name': 'reps'}
    }
    return seedDatabase(db)
  })

  afterEach(() => {
    return db.measurements.clear()
      .then(() => db.exercises.clear())
      .then(() => db.workouts.clear())
  })

  describe('validateExercise()', () => {

    it('returns true if attrs are valid', () => {
      return validateExercise(validAttrs, db)
        .then((res) => expect(res).to.be.eql(validAttrs))
    })

    it('returns an error if an exercise doesn\'t have a name', () => {
      delete validAttrs.name
      return validateExercise(validAttrs, db)
        .catch((errors) => expect(errors.type).to.be.equal('required'))
    })

    it('returns an error if an exercise doesn\'t have a measurement', () => {
      delete validAttrs.measurement
      return validateExercise(validAttrs, db)
        .catch((errors) => expect(errors.type).to.be.equal('required'))
    })

    it('returns an error if an exercise doesn\'t have a measurement name', () => {
      delete validAttrs.measurement.name
      return validateExercise(validAttrs, db)
        .catch((errors) => expect(errors.type).to.be.equal('required'))
    })
  })

  it('fetchExercises()', () => {
    return fetchExercises(db)
      .then((exercises) => {
        expect(exercises.length).to.be.equal(4)
        // Check exercises has a self-contained measurement with no id
        exercises.forEach((exercise) => {
          expect(exercise.measurement).to.be.an('object')
          expect(exercise.measurement.id).to.be.equal(undefined)
        })
      })
  })

  it('getExercise', () => {
    return db.exercises.toArray()
      .then(([exercise]) => {
        getExercise(exercise.id, db)
          .then((res) => expect(res).to.be.eql(exercise))
      })
  })

  describe('createExercise()', () => {

    it('creates a cleansed valid exercise in DB', () => {
      return createExercise(validAttrs, db)
        .then((expected) => expect(validAttrs).to.be.eql(expected))
    })

    it('doesn\'t allow to create an exercise with invalid attrs', () => {
      delete validAttrs['name']
      return createExercise(validAttrs, db)
        .catch((errors) => expect(errors.type).to.be.equal('required'));
    })
  })

  describe('deleteExercise()', () => {
    it('deletes an existing exercise', () => {
      return db.exercises.toArray()
        .then(([burpees, ...remaining]) => {
          return deleteExercise(burpees.id, db)
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
            name: 'Foo',
            measurement: {name: 'Km'}
          }
          return updateExercise(attrs, db)
            .then((nextExercise) => {
              // Verify exercise was successfully updated in DB
              expect(nextExercise.id).to.be.equal(prevExercise.id)
              expect(nextExercise.name).to.be.equal(attrs.name)
              expect(nextExercise.measurement.name).to.be.equal(attrs.measurement.name)
            })
        })
    })

    it('doesn\'t update an exercise with invalid attrs', () => {
      return db.exercises.toArray()
        .then(([exercise]) => {
          // Set a few attributes with INvalid values
          return {
            ...exercise,
            name: '',
            measurement: {name: ''}
          }
        })
        .then((attrs) => updateExercise(attrs, db))
        // A an error of type required is expected
        .catch((errors) => expect(errors.type).to.be.equal('required'))
    })
  })
})
