import {expect} from 'chai'
import {initialState} from '../../utils/crud-initial-state'
import {exerciseReducer} from '../exercise-reducer'
import {EXERCISE} from '../exercise-actions'

describe('Exercise Reducer', () => {

  it('should return the initial state', () => {
    expect(exerciseReducer(undefined, {}))
      .to.be.eql({
        items: {},
        isBusy: false,
        errorMsg: null
      })
  })

  it('FETCH_INIT', () => {
    const action  = {type: EXERCISE.FETCH_INIT}
    expect(exerciseReducer(initialState, action))
      .to.be.eql({
        ...initialState,
        isBusy: true,
        errorMsg: null
      })
  })

  it('FETCH_SUCCESS', () => {
    const data = [{id: 1, title: 'Lorem'}, {id :2, title: 'Ipsum'}]
    const action  = {type: EXERCISE.FETCH_SUCCESS, items: data}
    const expectedData = {
      1: {...data[0], _meta: {isBusy: false, errors: {}}},
      2: {...data[1], _meta: {isBusy: false, errors: {}}},
    }
    expect(exerciseReducer(initialState, action))
      .to.be.eql({
        ...initialState,
        items: expectedData,
        isBusy: false,
        errorMsg: null
      })
  })

  it('FETCH_FAILURE', () => {
    const errorMsg = 'There was an error while fetching the exercises'
    const action  = {type: EXERCISE.FETCH_FAILURE, errorMsg}
    expect(exerciseReducer(initialState, action))
      .to.be.eql({
        ...initialState,
        isBusy: false,
        errorMsg: errorMsg
      })
  })
})