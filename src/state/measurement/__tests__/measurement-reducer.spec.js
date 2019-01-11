import {expect} from 'chai'
import {measurementReducer} from '../measurement-reducer'
import {getCRUDInitialState} from '../../utils/crud-initial-state'
import {MEASUREMENT} from '../measurement-actions'

describe('Exercise Reducer', () => {

  it('should return the initial state', () => {
    expect(measurementReducer(undefined, {}))
      .to.be.eql({
        items     : {list:    [], errorMsg: null, isLoading: false},
        newItem   : {attrs: null, errors  :   {}, isLoading: false},
        deleteItem: {id:    null, errors  :   {}, isLoading: false}
      })
  })

  it('FETCH_INIT', () => {
    const action  = {type: MEASUREMENT.FETCH_INIT}
    expect(measurementReducer(getCRUDInitialState(), action))
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
    const action  = {type: MEASUREMENT.FETCH_SUCCESS, items: data}
    expect(measurementReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        items: {list: data, errorMsg: null, isLoading: false}
      })
  })

  it('FETCH_FAILURE', () => {
    const errorMsg = 'There was an error while fetching the measurements'
    const action  = {type: MEASUREMENT.FETCH_FAILURE, errorMsg}
    expect(measurementReducer(getCRUDInitialState(), action))
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
