import {expect} from 'chai'
import {workoutReducer, initialState} from '../workout-reducer'
import {WORKOUT} from '../workout-actions'
import {getCRUDInitialState} from '../../utils/crud-initial-state'

describe('Workout Reducer', () => {

  it('should return the initial state', () => {
    expect(workoutReducer(undefined, {}))
      .to.be.eql({
        items     : {list:    [], errorMsg: null, isLoading: false},
        newItem   : {attrs: null, errors  :   {}, isLoading: false},
        deleteItem: {id:    null, errors  :   {}, isLoading: false}
      })
  })

  it('FETCH_INIT', () => {
    const action  = {type: WORKOUT.FETCH_INIT}
    expect(workoutReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        items: {
          list: [],
          errorMsg: null,
          isLoading: true
        }
      })
  })

  it('FETCH_SUCCESS', () => {
    const data = [{id: 1, title: 'Lorem'}, {id :2, title: 'Ipsum'}]
    const action  = {type: WORKOUT.FETCH_SUCCESS, items: data}
    expect(workoutReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        items: {list: data, errorMsg: null, isLoading: false}
      })
  })

  it('FETCH_FAILURE', () => {
    const errorMsg = 'There was an error while fetching the workouts'
    const action  = {type: WORKOUT.FETCH_FAILURE, errorMsg}
    expect(workoutReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        items: {
          ...getCRUDInitialState().items,
          errorMsg: errorMsg,
          isLoading: false
        }
      })
  })
})
