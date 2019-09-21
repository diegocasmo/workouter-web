import { expect } from 'chai'
import faker from 'faker'
import { Factory } from 'rosie'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { USER } from '../actions'
import { ERROR } from '../../error/actions'
import { login, logout } from '../action-creators'
import { GraphQLClient } from 'graphql-request'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('User Action Creators', () => {
  describe('login()', () => {
    afterEach(() => {
      GraphQLClient.prototype.request.restore()
    })

    it("dispatches 'LOGIN_INIT', 'LOGIN_SUCCESS' on successful login", async () => {
      const user = Factory.buildList('user')
      const googleUser = { getAuthResponse: () => ({ id_token: user.id }) }

      sinon
        .stub(GraphQLClient.prototype, 'request')
        .callsFake(() => Promise.resolve({ currentUser: user }))

      const expectedActions = [
        { type: USER.LOGIN_INIT },
        { type: USER.LOGIN_SUCCESS, payload: user },
      ]

      const store = mockStore()
      await store.dispatch(login(googleUser))

      expect(store.getActions()).to.be.eql(expectedActions)
    })

    it("dispatches 'LOGIN_FAILURE' and 'ERROR__ADD' on login failure", async () => {
      const errorMsg = faker.lorem.words()
      const user = Factory.buildList('user')
      const googleUser = { getAuthResponse: () => ({ id_token: user.id }) }

      sinon
        .stub(GraphQLClient.prototype, 'request')
        .callsFake(() => Promise.reject(new Error(errorMsg)))

      const expectedActions = [
        { type: USER.LOGIN_INIT },
        { type: USER.LOGIN_FAILURE },
        { type: ERROR.ADD, errorMsg },
      ]

      const store = mockStore()
      await store.dispatch(login(googleUser))

      expect(store.getActions()).to.be.eql(expectedActions)
    })
  })

  describe('logout()', () => {
    it("dispatches 'LOGOUT'", () => {
      const expected = { type: USER.LOGOUT }
      const actual = logout()
      expect(actual).to.be.eql(expected)
    })
  })
})
