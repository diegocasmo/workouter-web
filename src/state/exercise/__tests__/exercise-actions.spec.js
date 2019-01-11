import {expect} from 'chai'
import {EXERCISE} from '../exercise-actions'

describe('EXERCISE', () => {

  it('correctly defines all actions', () => {
    const actions = {
      'FETCH_INIT'   : 'EXERCISE__FETCH_INIT',
      'FETCH_SUCCESS': 'EXERCISE__FETCH_SUCCESS',
      'FETCH_FAILURE': 'EXERCISE__FETCH_FAILURE',

      'CREATE_INIT'   : 'EXERCISE__CREATE_INIT',
      'CREATE_SUCCESS': 'EXERCISE__CREATE_SUCCESS',
      'CREATE_FAILURE': 'EXERCISE__CREATE_FAILURE',
    }
    for (const key in actions) {
      expect(EXERCISE[key]).to.equal(actions[key])
    }
  })
})
