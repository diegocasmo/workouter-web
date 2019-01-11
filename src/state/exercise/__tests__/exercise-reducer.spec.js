import {expect} from 'chai'
import {exerciseReducer} from '../exercise-reducer'
import {getCRUDInitialState} from '../../utils/crud-initial-state'
import {EXERCISE} from '../exercise-actions'

describe('Exercise Reducer', () => {

  it('should return the initial state', () => {
    expect(exerciseReducer(undefined, {}))
      .to.be.eql({
        items  : {list:    [], errorMsg: null, isLoading: false},
        newItem: {attrs: null, errors  :   {}, isLoading: false}
      })
  })

  it('FETCH_INIT', () => {
    const action  = {type: EXERCISE.FETCH_INIT}
    expect(exerciseReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        items: {
          ...getCRUDInitialState().items,
          errorMsg: null,
          isLoading: true
        }
      })
  })

  it('FETCH_SUCCESS', () => {
    const data = [{id: 1, title: 'Lorem'}, {id :2, title: 'Ipsum'}]
    const action  = {type: EXERCISE.FETCH_SUCCESS, items: data}
    expect(exerciseReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        items: {list: data, errorMsg: null, isLoading: false}
      })
  })

  it('FETCH_FAILURE', () => {
    const errorMsg = 'There was an error while fetching the exercises'
    const action  = {type: EXERCISE.FETCH_FAILURE, errorMsg}
    expect(exerciseReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        items: {
          ...getCRUDInitialState().items,
          errorMsg: errorMsg,
          isLoading: false
        }
      })
  })

  it('CREATE_INIT', () => {
    const attrs = {'name': 'Abs','measurement': {'name': 'reps'}}
    const action  = {type: EXERCISE.CREATE_INIT, item: attrs}
    expect(exerciseReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        newItem: {
          attrs,
          errors: {},
          isLoading: true
        }
      })
  })

  it('CREATE_SUCCESS', () => {
    // Set up initial state as if an exercise is being created
    const attrs = {'name': 'Abs','measurement': {'name': 'reps'}}
    const state = {
      ...getCRUDInitialState(),
      newItem: {
        attrs,
        errors: {},
        isLoading: true
      }
    }

    const action  = {type: EXERCISE.CREATE_SUCCESS, item: attrs}
    expect(exerciseReducer(state, action))
      .to.be.eql({
        ...getCRUDInitialState(),
        items: {
          ...getCRUDInitialState().items,
          list: [attrs]
        },
        newItem: getCRUDInitialState().newItem
      })
  })

  it('CREATE_FAILURE', () => {
    // Set up initial state as if an exercise is being created
    const attrs = {'measurement': {'name': 'reps'}}
    const state = {
      ...getCRUDInitialState(),
      newItem: {
        attrs,
        errors: {},
        isLoading: true
      }
    }

    const errors = {'name': 'Name is required'}
    const action  = {type: EXERCISE.CREATE_FAILURE, item: attrs, errors}
    expect(exerciseReducer(state, action))
      .to.be.eql({
        ...getCRUDInitialState(),
        newItem: {
          attrs,
          errors,
          isLoading: false
        }
      })
  })
})
