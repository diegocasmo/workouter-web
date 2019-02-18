import {expect} from 'chai'
import {Factory} from 'rosie'
import {sessionReducer, initialState} from '../session-reducer'
import {SESSION} from '../session-actions'
import {REQUEST_STATUS} from '../../utils/request-status'

describe('Session Reducer', () => {

  it('should return the initial state', () => {
    expect(sessionReducer(undefined, {}))
      .to.be.eql({
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
      const sessions = Factory.buildList('session', 2)
      const action = {type: SESSION.FETCH_SUCCESS, items: sessions}

      // Expect sessions to be added to the state by their ids
      const items = sessions.reduce((acc, x) => ({...acc, [x.id]: x}), {})
      const expectedState = {
        ...initialState,
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
  })
})
