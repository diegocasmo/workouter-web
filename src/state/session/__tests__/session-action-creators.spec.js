import {expect} from 'chai'
import faker from 'faker'
import {Factory} from 'rosie'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as session from '../../../api/session'
import {SESSION} from '../session-actions'
import {ERROR} from '../../error/error-actions'
import {fetchSessions, fetchClear, getSession} from '../session-action-creators'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Session Action Creators', () => {

  describe('fetchSessions()', () => {

    afterEach(() => {
      session.fetchSessions.restore()
    })

    it("dispatches 'FETCH_INIT', 'FETCH_SUCCESS' on sessions fetch success", async () => {
      const items = Factory.buildList('session', 2)
      sinon.stub(session, 'fetchSessions').callsFake(sinon.spy(() => Promise.resolve(items)))
      const expectedActions = [
        {type: SESSION.FETCH_INIT},
        {type: SESSION.FETCH_SUCCESS, items}
      ]

      const store = mockStore({sessions: {perPage: 45}})
      const pageNum = 15
      await store.dispatch(fetchSessions(pageNum))

      expect(session.fetchSessions.calledOnce).to.be.true
      expect(session.fetchSessions.calledWith({
        pageNum,
        perPage: 45
      })).to.be.true
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

  describe('fetchClear()', () => {

    it("dispatches 'FETCH_CLEAR'", () => {
      const expected = {type: SESSION.FETCH_CLEAR}
      const actual = fetchClear()
      expect(actual).to.be.eql(expected)
    })
  })

  describe('getSession()', () => {

    afterEach(() => {
      session.getSession.restore()
    })

    it("dispatches 'GET_INIT', 'GET_SUCCESS' on session get success", async () => {
      const item = Factory.build('session')
      sinon.stub(session, 'getSession').resolves(item)
      const expectedActions = [
        {type: SESSION.GET_INIT},
        {type: SESSION.GET_SUCCESS, item}
      ]

      const store = mockStore({sessions: {}})
      await store.dispatch(getSession(item.id))
      expect(store.getActions()).to.be.eql(expectedActions)
    })

    it("dispatches 'GET_FAILURE' and 'ERROR__ADD' on session get failure", async () => {
      const errorMsg = faker.lorem.words()
      sinon.stub(session, 'getSession').rejects(new Error(errorMsg))
      const expectedActions = [
        {type: SESSION.GET_INIT},
        {type: SESSION.GET_FAILURE},
        {type: ERROR.ADD, errorMsg}
      ]

      const store = mockStore({sessions: {}})
      await store.dispatch(getSession(-1))
      expect(store.getActions()).to.be.eql(expectedActions)
    })
  })

})
