import {expect} from 'chai'
import {USER} from '../actions'

describe('USER', () => {

  it('correctly defines all actions', () => {
    const actions = {
      'LOGIN_INIT'   : 'USER__LOGIN_INIT',
      'LOGIN_SUCCESS': 'USER__LOGIN_SUCCESS',
      'LOGIN_FAILURE': 'USER__LOGIN_FAILURE',

      'LOGOUT'       : 'USER__LOGOUT',
    }
    Object.keys(actions).forEach(k => expect(USER[k]).to.equal(actions[k]))
  })
})
