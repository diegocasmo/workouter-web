import { expect } from 'chai'
import { EXERCISE } from '../actions'

describe('EXERCISE', () => {
  it('correctly defines all actions', () => {
    const actions = {
      FETCH_INIT: 'EXERCISE__FETCH_INIT',
      FETCH_SUCCESS: 'EXERCISE__FETCH_SUCCESS',
      FETCH_FAILURE: 'EXERCISE__FETCH_FAILURE',
      FETCH_CLEAR: 'EXERCISE__FETCH_CLEAR',

      GET_INIT: 'EXERCISE__GET_INIT',
      GET_SUCCESS: 'EXERCISE__GET_SUCCESS',
      GET_FAILURE: 'EXERCISE__GET_FAILURE',

      DELETE_INIT: 'EXERCISE__DELETE_INIT',
      DELETE_SUCCESS: 'EXERCISE__DELETE_SUCCESS',
      DELETE_FAILURE: 'EXERCISE__DELETE_FAILURE',
    }
    Object.keys(actions).forEach(k => expect(EXERCISE[k]).to.equal(actions[k]))
  })
})
