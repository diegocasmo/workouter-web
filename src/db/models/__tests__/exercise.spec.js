import db from '../../../db-mock'
import {expect} from 'chai'
import {seedDatabase} from '../../seed'
import {validateExercise, cleanseExerciseAttrs, fetchExercises, createExercise} from '../exercise'

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

  describe('cleanseExerciseAttrs', () => {

    it('removes unwanted attrs', () => {
      validAttrs['_meta'] = {isBusy: true, errors: {'name': 'test'}}
      validAttrs['id'] = 2
      // Removes unwanted attrs
      expect(cleanseExerciseAttrs(validAttrs)._meta).to.be.undefined
      expect(cleanseExerciseAttrs(validAttrs).id).to.be.undefined
      // Keeps wanted attrs
      expect(cleanseExerciseAttrs(validAttrs).name).to.exist
      expect(cleanseExerciseAttrs(validAttrs).measurement.name).to.exist
    })
  })

  it('fetchExercises()', () => {
    return fetchExercises(db)
      .then((res) => {
        expect(res.length).to.be.equal(4)
        // Check exercises has a self-contained measurement with no id
        res.forEach((exercise) => {
          expect(exercise.measurement).to.be.an('object')
          expect(exercise.measurement.id).to.be.equal(undefined)
        })
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
})
