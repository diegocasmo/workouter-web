import {expect} from 'chai'
import faker from 'faker'
import {Factory} from 'rosie'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as session from '../../../api/session'
import {SESSION} from '../session-actions'
import {ERROR} from '../../error/error-actions'
import {fetchSessions} from '../session-action-creators'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Session Action Creators', () => {

  describe('fetchSessions()', () => {

    afterEach(() => {
      session.fetchSessions.restore()
    })

    it("dispatches 'FETCH_INIT', 'FETCH_SUCCESS' on sessions fetch success", async () => {
      const items = Factory.buildList('session', 2)
      sinon.stub(session, 'fetchSessions').resolves(items)
      const expectedActions = [
        {type: SESSION.FETCH_INIT},
        {type: SESSION.FETCH_SUCCESS, items}
      ]

      const store = mockStore({sessions: {}})
      await store.dispatch(fetchSessions())
      expect(store.getActions()).to.be.eql(expectedActions)
    })

    it("dispatches 'FETCH_FAILURE' and 'ERROR__ADD' on sessions fetch failure", async () => {
      const errorMsg = faker.lorem.words()
      sinon.stub(session, 'fetchSessions').rejects(new Error(errorMsg))
      const expectedActions = [
        {type: SESSION.FETCH_INIT},
        {type: SESSION.FETCH_FAILURE},
        {type: ERROR.ADD, errorMsg}
      ]

      const store = mockStore({sessions: {}})
      await store.dispatch(fetchSessions())
      expect(store.getActions()).to.be.eql(expectedActions)
    })
  })
})
