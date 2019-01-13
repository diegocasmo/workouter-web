import {expect} from 'chai'
import {workoutReducer, initialState} from '../workout-reducer'
import {WORKOUT} from '../workout-actions'

describe('Workout Reducer', () => {

  it('should return the initial state', () => {
    expect(workoutReducer(undefined, {}))
      .to.be.eql({
        getItems: {list: [], errorMsg: null, isLoading: false}
      })
  })

  describe('FETCH', () => {

    it('FETCH_INIT', () => {
      const items = [{id: 1, name: 'Lorem'}, {id :2, name: 'Ipsum'}]
      const state = {
        ...initialState,
        getItems: {
          ...initialState.getItems,
          list: items
        }
      }

      const action = {type: WORKOUT.FETCH_INIT}
      expect(workoutReducer(state, action))
        .to.be.eql({
          ...state,
          getItems: {
            ...state.getItems,
            errorMsg: null,
            isLoading: true
          }
        })
    })

    it('FETCH_SUCCESS', () => {
      const items = [{id: 1, name: 'Lorem'}, {id :2, name: 'Ipsum'}]
      const action = {type: WORKOUT.FETCH_SUCCESS, items}
      expect(workoutReducer(initialState, action))
        .to.be.eql({
          ...initialState,
          getItems: {
            list: initialState.getItems.list.concat(items),
            errorMsg: null,
            isLoading: false
          }
        })
    })

    it('FETCH_FAILURE', () => {
      const errorMsg = 'There was an error while fetching the workouts'
      const action = {type: WORKOUT.FETCH_FAILURE, errorMsg}
      expect(workoutReducer(initialState, action))
        .to.be.eql({
          ...initialState,
          getItems: {
            ...initialState.getItems,
            errorMsg: errorMsg,
            isLoading: false
          }
        })
    })

    it('FETCH_RESET', () => {
      // Assume there are workouts in state
      const state = {
        ...initialState,
        getItems: {
          ...initialState.getItems,
          list: [{id: 1, name: 'Lorem'}, {id :2, name: 'Ipsum'}]
        }
      }

      // Reset such workouts
      const action = {type: WORKOUT.FETCH_RESET}
      expect(workoutReducer(state, action))
        .to.be.eql({
          ...initialState,
          getItems: initialState.getItems
        })
    })
  })
})
