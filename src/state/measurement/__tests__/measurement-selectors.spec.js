import {expect} from 'chai'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {initialState} from '../measurement-reducer'
import {getMeasurements, areMeasurementsLoading, hasMeasurementsError} from '../measurement-selectors'

describe('Measurement Selectors', () => {

  let state
  beforeEach(() => {
    state = {measurements: initialState}
  })

  describe('getMeasurements()', () => {

    it('returns a list of measurements', () => {
      const list = Factory.buildList(3, 'measurement')
      state.measurements.getItems.list = list
      expect(getMeasurements(state)).to.be.eql(list)
    })
  })

  describe('areMeasurementsLoading()', () => {

    it('returns true if measurements are being loaded', () => {
      state.measurements.getItems.isLoading = true
      expect(areMeasurementsLoading(state)).to.be.true
    })

    it('returns false if measurements are not being loaded', () => {
      state.measurements.getItems.isLoading = false
      expect(areMeasurementsLoading(state)).to.be.false
    })
  })

  describe('hasMeasurementsError()', () => {

    it('returns true if measurements have an error', () => {
      state.measurements.getItems.errorMsg = 'Some error message'
      expect(hasMeasurementsError(state)).to.be.true
    })

    it('returns false if measurements have no error', () => {
      state.measurements.getItems.errorMsg = null
      expect(hasMeasurementsError(state)).to.be.false
    })
  })
})
