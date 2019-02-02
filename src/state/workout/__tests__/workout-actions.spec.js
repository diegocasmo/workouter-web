import {expect} from 'chai'
import {WORKOUT} from '../workout-actions'

describe('WORKOUT', () => {

  it('correctly defines all actions', () => {
    const actions = {
      'FETCH_INIT'    : 'WORKOUT__FETCH_INIT',
      'FETCH_SUCCESS' : 'WORKOUT__FETCH_SUCCESS',
      'FETCH_FAILURE' : 'WORKOUT__FETCH_FAILURE',

      'GET_INIT'      : 'WORKOUT__GET_INIT',
      'GET_SUCCESS'   : 'WORKOUT__GET_SUCCESS',
      'GET_FAILURE'   : 'WORKOUT__GET_FAILURE',

      'DELETE_INIT'   : 'WORKOUT__DELETE_INIT',
      'DELETE_SUCCESS': 'WORKOUT__DELETE_SUCCESS',
      'DELETE_FAILURE': 'WORKOUT__DELETE_FAILURE',
    }
    Object.keys(actions).forEach((k) => expect(WORKOUT[k]).to.equal(actions[k]))
  })
})
