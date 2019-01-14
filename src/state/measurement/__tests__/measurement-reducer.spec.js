import {expect} from 'chai'
import {Factory} from 'rosie'
import {measurementReducer, initialState} from '../measurement-reducer'
import {MEASUREMENT} from '../measurement-actions'

describe('Measurement Reducer', () => {

  it('should return the initial state', () => {
    expect(measurementReducer(undefined, {}))
      .to.be.eql({
        getItems: {list: [], errorMsg: null, isLoading: false}
      })
  })

  describe('FETCH', () => {

    it('FETCH_INIT', () => {
      const items = Factory.buildList('measurement', 2)
      const state = {
        ...initialState,
        getItems: {
          ...initialState.getItems,
          list: items
        }
      }

      const action = {type: MEASUREMENT.FETCH_INIT}
      expect(measurementReducer(state, action))
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
      const items = Factory.buildList('measurement', 2)
      const action = {type: MEASUREMENT.FETCH_SUCCESS, items}
      expect(measurementReducer(initialState, action))
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
      const errorMsg = 'There was an error while fetching the measurements'
      const action = {type: MEASUREMENT.FETCH_FAILURE, errorMsg}
      expect(measurementReducer(initialState, action))
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
      // Assume there are measurements in state
      const state = {
        ...initialState,
        getItems: {
          ...initialState.getItems,
          list: Factory.buildList('measurement', 2)
        }
      }

      // Reset such measurements
      const action = {type: MEASUREMENT.FETCH_RESET}
      expect(measurementReducer(state, action))
        .to.be.eql({
          ...initialState,
          getItems: initialState.getItems
        })
    })
  })
})
