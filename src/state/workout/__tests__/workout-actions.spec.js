import {expect} from 'chai'
import {WORKOUT} from '../workout-actions'

describe('WORKOUT', () => {

  it('correctly defines all actions', () => {
    const actions = {
      'FETCH_INIT'   : 'WORKOUT__FETCH_INIT',
      'FETCH_SUCCESS': 'WORKOUT__FETCH_SUCCESS',
      'FETCH_FAILURE': 'WORKOUT__FETCH_FAILURE',
      'FETCH_RESET'  : 'WORKOUT__FETCH_RESET'
    }
    for (const key in actions) {
      expect(WORKOUT[key]).to.equal(actions[key])
    }
  })
})
