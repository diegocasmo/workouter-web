import {expect} from 'chai'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {initialState} from '../exercise-reducer'
import {
  getExercises, areExercisesLoading, hasExercisesError,
  getActiveExercise, isActiveExerciseLoading, hasActiveExerciseError,
  getNewExercise, isNewExerciseSubmitting, getNewExerciseErrors,
  isUpdateExerciseSubmitting, getUpdateExerciseErrors
} from '../exercise-selectors'

describe('Exercise Selectors', () => {

  let state
  beforeEach(() => {
    state = {exercises: initialState}
  })

  describe('getExercises()', () => {

    it('returns a list of exercises', () => {
      const list = Factory.buildList(3, 'exercise')
      state.exercises.getItems.list = list
      expect(getExercises(state)).to.be.eql(list)
    })
  })

  describe('areExercisesLoading()', () => {

    it('returns true if exercises are being loaded', () => {
      state.exercises.getItems.isLoading = true
      expect(areExercisesLoading(state)).to.be.true
    })

    it('returns false if exercises are not being loaded', () => {
      state.exercises.getItems.isLoading = false
      expect(areExercisesLoading(state)).to.be.false
    })
  })

  describe('hasExercisesError()', () => {

    it('returns true if exercises have an error', () => {
      state.exercises.getItems.errorMsg = 'Some error message'
      expect(hasExercisesError(state)).to.be.true
    })

    it('returns false if exercises have no error', () => {
      state.exercises.getItems.errorMsg = null
      expect(hasExercisesError(state)).to.be.false
    })
  })

  describe('getActiveExercise()', () => {

    it('returns the currently active exercise', () => {
      const item = Factory.build('exercise')
      state.exercises.getItem.attrs = item
      expect(getActiveExercise(state)).to.be.eql(item)
    })
  })

  describe('isActiveExerciseLoading', () => {

    it('returns true if the currently active exercise is loading', () => {
      state.exercises.getItem.isLoading = true
      expect(isActiveExerciseLoading(state)).to.be.true
    })

    it('returns false if the currently active exercise is not loading', () => {
      state.exercises.getItem.isLoading = false
      expect(isActiveExerciseLoading(state)).to.be.false
    })
  })

  describe('hasActiveExerciseError', () => {

    it('returns true if the currently active exercise has an error', () => {
      state.exercises.getItem.errorMsg = 'Some error'
      expect(hasActiveExerciseError(state)).to.be.true
    })

    it('returns false if the currently active exercise has no error', () => {
      state.exercises.getItem.errorMsg = null
      expect(hasActiveExerciseError(state)).to.be.false
    })
  })

  describe('getNewExercise()', () => {

    it('returns the new exercise attrs', () => {
      const item = Factory.build('exercise')
      state.exercises.postItem.attrs = item
      expect(getNewExercise(state)).to.be.eql(item)
    })
  })

  describe('isNewExerciseSubmitting()', () => {

    it('returns true if new exercise is being submitted', () => {
      state.exercises.postItem.isLoading = true
      expect(isNewExerciseSubmitting(state)).to.be.true
    })

    it('returns false if new exercise is not being submitted', () => {
      state.exercises.postItem.isLoading = false
      expect(isNewExerciseSubmitting(state)).to.be.false
    })
  })

  describe('getNewExerciseErrors()', () => {

    it('returns new exercise errors', () => {
      const errors = {'name': 'Name is required'}
      state.exercises.postItem.errors = {errors}
      expect(getNewExerciseErrors(state)).to.be.eql(errors)
    })
  })

  describe('isUpdateExerciseSubmitting()', () => {

    it('returns true if update exercise is being submitted', () => {
      state.exercises.putItem.isLoading = true
      expect(isUpdateExerciseSubmitting(state)).to.be.true
    })

    it('returns false if update exercise is not being submitted', () => {
      state.exercises.putItem.isLoading = false
      expect(isUpdateExerciseSubmitting(state)).to.be.false
    })
  })

  describe('getUpdateExerciseErrors()', () => {

    it('returns update exercise errors', () => {
      const errors = {'name': 'Name is required'}
      state.exercises.putItem.errors = {errors}
      expect(getUpdateExerciseErrors(state)).to.be.eql(errors)
    })
  })
})
