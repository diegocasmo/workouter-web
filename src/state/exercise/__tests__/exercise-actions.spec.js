import {expect} from 'chai'
import {EXERCISE} from '../exercise-actions'

describe('EXERCISE', () => {

  it('correctly defines all actions', () => {
    const actions = {
      'FETCH_INIT'    : 'EXERCISE__FETCH_INIT',
      'FETCH_SUCCESS' : 'EXERCISE__FETCH_SUCCESS',
      'FETCH_FAILURE' : 'EXERCISE__FETCH_FAILURE',

      'GET_INIT'      : 'EXERCISE__GET_INIT',
      'GET_SUCCESS'   : 'EXERCISE__GET_SUCCESS',
      'GET_FAILURE'   : 'EXERCISE__GET_FAILURE',
      'GET_RESET'     : 'EXERCISE__GET_RESET',
      'GET_RESET'     : 'EXERCISE__GET_RESET',

      'CREATE_INIT'   : 'EXERCISE__CREATE_INIT',
      'CREATE_SUCCESS': 'EXERCISE__CREATE_SUCCESS',
      'CREATE_FAILURE': 'EXERCISE__CREATE_FAILURE',
      'CREATE_RESET'  : 'EXERCISE__CREATE_RESET',

      'UPDATE_INIT'   : 'EXERCISE__UPDATE_INIT',
      'UPDATE_SUCCESS': 'EXERCISE__UPDATE_SUCCESS',
      'UPDATE_FAILURE': 'EXERCISE__UPDATE_FAILURE',
      'UPDATE_RESET'  : 'EXERCISE__UPDATE_RESET',

      'DELETE_INIT'   : 'EXERCISE__DELETE_INIT',
      'DELETE_SUCCESS': 'EXERCISE__DELETE_SUCCESS',
      'DELETE_FAILURE': 'EXERCISE__DELETE_FAILURE',
      'DELETE_RESET'  : 'EXERCISE__DELETE_RESET',
    }
    for (const key in actions) {
      expect(EXERCISE[key]).to.equal(actions[key])
    }
  })
})
