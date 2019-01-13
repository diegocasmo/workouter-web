import {expect} from 'chai'
import {MEASUREMENT} from '../measurement-actions'

describe('MEASUREMENT', () => {

  it('correctly defines all actions', () => {
    const actions = {
      'FETCH_INIT'   : 'MEASUREMENT__FETCH_INIT',
      'FETCH_SUCCESS': 'MEASUREMENT__FETCH_SUCCESS',
      'FETCH_FAILURE': 'MEASUREMENT__FETCH_FAILURE',
      'FETCH_RESET'  : 'MEASUREMENT__FETCH_RESET',
    }
    for (const key in actions) {
      expect(MEASUREMENT[key]).to.equal(actions[key])
    }
  })
})
