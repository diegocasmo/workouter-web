import { expect } from 'chai'
import { SESSION } from '../actions'

describe('SESSION', () => {
  it('correctly defines all actions', () => {
    const actions = {
      FETCH_INIT: 'SESSION__FETCH_INIT',
      FETCH_SUCCESS: 'SESSION__FETCH_SUCCESS',
      FETCH_FAILURE: 'SESSION__FETCH_FAILURE',
      FETCH_CLEAR: 'SESSION__FETCH_CLEAR',

      GET_INIT: 'SESSION__GET_INIT',
      GET_SUCCESS: 'SESSION__GET_SUCCESS',
      GET_FAILURE: 'SESSION__GET_FAILURE',
    }
    Object.keys(actions).forEach(k => expect(SESSION[k]).to.equal(actions[k]))
  })
})
