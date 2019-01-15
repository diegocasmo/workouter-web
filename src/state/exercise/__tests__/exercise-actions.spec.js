import {expect} from 'chai'
import {EXERCISE} from '../exercise-actions'

describe('EXERCISE', () => {

  it('correctly defines all actions', () => {
    const actions = {
      'FETCH_INIT'    : 'EXERCISE__FETCH_INIT',
      'FETCH_SUCCESS' : 'EXERCISE__FETCH_SUCCESS',

      'GET_INIT'      : 'EXERCISE__GET_INIT',
      'GET_SUCCESS'   : 'EXERCISE__GET_SUCCESS',

      'DELETE_INIT'   : 'EXERCISE__DELETE_INIT',
      'DELETE_SUCCESS': 'EXERCISE__DELETE_SUCCESS',
    }
    Object.keys(actions).forEach((k) => expect(EXERCISE[k]).to.equal(actions[k]))
  })
})
