import {expect} from 'chai'
import {Factory} from 'rosie'
import {sessionReducer, initialState} from '../session-reducer'
import {SESSION} from '../session-actions'
import {REQUEST_STATUS} from '../../utils/request-status'

describe('Session Reducer', () => {

  it('should return the initial state', () => {
    expect(sessionReducer(undefined, {}))
      .to.be.eql({
        perPage: 12,
        hasMore: true,
        items : {},
        status: REQUEST_STATUS.NONE
      })
  })

  describe('FETCH', () => {

    it('FETCH_INIT', () => {
      // Assume there are some sessions already in state
      const sessions = Factory.buildList('session', 2)
      const items = sessions.reduce((acc, x) => ({...acc, [x.id]: x}), {})
      const state = {
        ...initialState,
        items
      }

      const action = {type: SESSION.FETCH_INIT}
      expect(sessionReducer(state, action))
        .to.be.eql({
          ...state,
          items,
          status: REQUEST_STATUS.GET
        })
    })

    it('FETCH_SUCCESS', () => {
      const sessions = Factory.buildList('session', 20)
      const action = {type: SESSION.FETCH_SUCCESS, items: sessions}

      // Expect sessions to be added to the state by their ids
      const items = sessions.reduce((acc, x) => ({...acc, [x.id]: x}), {})
      const expectedState = {
        ...initialState,
        hasMore: sessions.length >= initialState.perPage,
        items,
        status: REQUEST_STATUS.NONE
      }

      expect(sessionReducer(initialState, action))
        .to.be.eql(expectedState)
    })

    it('FETCH_FAILURE', () => {
      const state = {
        ...initialState,
        status: REQUEST_STATUS.GET
      }

      const action = {type: SESSION.FETCH_FAILURE}
      expect(sessionReducer(state, action))
        .to.be.eql({
          ...state,
          status: REQUEST_STATUS.NONE
        })
    })

    it('FETCH_CLEAR', () => {
      // Assume there are some sessions already in state
      const sessions = Factory.buildList('session', 10)
      const items = sessions.reduce((acc, x) => ({...acc, [x.id]: x}), {})
      const state = {...initialState, items}

      const action = {type: SESSION.FETCH_CLEAR}
      const expected = initialState
      const actual = sessionReducer(state, action)
      expect(actual).to.be.eql(expected)
    })
  })

  describe('GET', () => {

    it('GET_INIT', () => {
      const action = {type: SESSION.GET_INIT}
      expect(sessionReducer(initialState, action))
        .to.be.eql({
          ...initialState,
          status: REQUEST_STATUS.GET
        })
    })

    it('GET_SUCCESS', () => {
      // Assume session to be fetched was already in state (must be replaced anyways,
      // it might be a new version of it)
      const prevSession = Factory.build('session', {id: 1})
      const state = {
        ...initialState,
        items: {1: prevSession}
      }

      const nextSession = Factory.build('session', {...prevSession, name: 'new version'})
      const action = {type: SESSION.GET_SUCCESS, item: nextSession}
      expect(sessionReducer(state, action))
        .to.be.eql({
          ...state,
          items: {1: nextSession},
          status: REQUEST_STATUS.NONE
        })
    })

    it('GET_FAILURE', () => {
      const action = {type: SESSION.GET_FAILURE}

      const state = {
        ...initialState,
        status: REQUEST_STATUS.GET
      }

      expect(sessionReducer(state, action))
        .to.be.eql({
          ...state,
          status: REQUEST_STATUS.NONE
        })
    })
  })
})
