import {expect} from 'chai'
import {getCRUDInitialState} from '../../utils/crud-initial-state'
import {workoutReducer} from '../workout-reducer'
import {WORKOUT} from '../workout-actions'

describe('Workout Reducer', () => {

  it('should return the initial state', () => {
    expect(workoutReducer(undefined, {}))
      .to.be.eql({
        items: {},
        isBusy: false,
        errorMsg: null
      })
  })

  it('FETCH_INIT', () => {
    const action  = {type: WORKOUT.FETCH_INIT}
    expect(workoutReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        isBusy: true,
        errorMsg: null
      })
  })

  it('FETCH_SUCCESS', () => {
    const data = [{id: 1, title: 'Lorem'}, {id :2, title: 'Ipsum'}]
    const action  = {type: WORKOUT.FETCH_SUCCESS, items: data}
    const expectedData = {
      1: {...data[0], _meta: {isBusy: false, errors: {}}},
      2: {...data[1], _meta: {isBusy: false, errors: {}}},
    }
    expect(workoutReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        items: expectedData,
        isBusy: false,
        errorMsg: null
      })
  })

  it('FETCH_FAILURE', () => {
    const errorMsg = 'There was an error while fetching the workouts'
    const action  = {type: WORKOUT.FETCH_FAILURE, errorMsg}
    expect(workoutReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        isBusy: false,
        errorMsg: errorMsg
      })
  })
})
