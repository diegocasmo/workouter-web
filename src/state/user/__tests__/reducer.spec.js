import { expect } from 'chai'
import { Factory } from 'rosie'
import { userReducer, initialState } from '../reducer'
import { USER } from '../actions'
import { REQUEST_STATUS } from '../../utils/request-status'

describe('User Reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).to.be.eql({
      user: null,
      status: REQUEST_STATUS.NONE,
    })
  })

  describe('LOGIN', () => {
    it('LOGIN_INIT', () => {
      const action = { type: USER.LOGIN_INIT }
      expect(userReducer(initialState, action)).to.be.eql({
        ...initialState,
        user: null,
        status: REQUEST_STATUS.POST,
      })
    })

    it('LOGIN_SUCCESS', () => {
      const user = Factory.build('user')

      const action = { type: USER.LOGIN_SUCCESS, payload: user }

      expect(userReducer(initialState, action)).to.be.eql({
        ...initialState,
        user,
        status: REQUEST_STATUS.NONE,
      })
    })

    it('LOGIN_FAILURE', () => {
      const action = { type: USER.LOGIN_FAILURE }

      const user = Factory.build('user')
      const state = { ...initialState, user, status: REQUEST_STATUS.POST }

      expect(userReducer(state, action)).to.be.eql({
        ...state,
        user: null,
        status: REQUEST_STATUS.NONE,
      })
    })
  })

  it('LOGOUT', () => {
    const action = { type: USER.LOGOUT }

    const user = Factory.build('user')
    const state = { ...initialState, user, status: REQUEST_STATUS.POST }

    expect(userReducer(state, action)).to.be.eql({
      ...initialState,
      user: null,
      status: REQUEST_STATUS.NONE,
    })
  })
})
