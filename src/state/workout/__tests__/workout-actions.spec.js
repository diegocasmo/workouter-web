import {expect} from 'chai'
import {WORKOUT} from '../workout-actions'

describe('WORKOUT', () => {

  it('correctly defines all actions', () => {
    const actions = {
      'FETCH_INIT'    : 'WORKOUT__FETCH_INIT',
      'FETCH_SUCCESS' : 'WORKOUT__FETCH_SUCCESS',

      'GET_INIT'      : 'WORKOUT__GET_INIT',
      'GET_SUCCESS'   : 'WORKOUT__GET_SUCCESS',

      'DELETE_INIT'   : 'WORKOUT__DELETE_INIT',
      'DELETE_SUCCESS': 'WORKOUT__DELETE_SUCCESS',
    }
    Object.keys(actions).forEach((k) => expect(WORKOUT[k]).to.equal(actions[k]))
  })
})
