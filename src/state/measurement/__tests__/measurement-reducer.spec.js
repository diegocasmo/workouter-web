import {expect} from 'chai'
import {measurementReducer} from '../measurement-reducer'
import {getCRUDInitialState} from '../../utils/crud-initial-state'
import {MEASUREMENT} from '../measurement-actions'

describe('Measurement Reducer', () => {

  it('should return the initial state', () => {
    expect(measurementReducer(undefined, {}))
      .to.be.eql({
        items: {},
        isBusy: false,
        errorMsg: null
      })
  })

  it('FETCH_INIT', () => {
    const action  = {type: MEASUREMENT.FETCH_INIT}
    expect(measurementReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        isBusy: true,
        errorMsg: null
      })
  })

  it('FETCH_SUCCESS', () => {
    const data = [{id: 1, title: 'Lorem'}, {id :2, title: 'Ipsum'}]
    const action  = {type: MEASUREMENT.FETCH_SUCCESS, items: data}
    const expectedData = {
      1: {...data[0], _meta: {isBusy: false, errors: {}}},
      2: {...data[1], _meta: {isBusy: false, errors: {}}},
    }
    expect(measurementReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        items: expectedData,
        isBusy: false,
        errorMsg: null
      })
  })

  it('FETCH_FAILURE', () => {
    const errorMsg = 'There was an error while fetching the measurements'
    const action  = {type: MEASUREMENT.FETCH_FAILURE, errorMsg}
    expect(measurementReducer(getCRUDInitialState(), action))
      .to.be.eql({
        ...getCRUDInitialState(),
        isBusy: false,
        errorMsg: errorMsg
      })
  })
})
