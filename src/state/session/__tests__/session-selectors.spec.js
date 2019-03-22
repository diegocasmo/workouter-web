import {expect} from 'chai'
import {Factory} from 'rosie'
import {initialState} from '../session-reducer'
import {REQUEST_STATUS} from '../../utils/request-status'
import {getSessions, getSession, isLoadingSessions} from '../session-selectors'

describe('Session Selectors', () => {

  let state
  beforeEach(() => {
    state = {sessions: initialState}
  })

  describe('getSessions()', () => {

    it('returns a list of sessions', () => {
      const sessions = Factory.buildList('session', 3)

      state.sessions.items = sessions.reduce((acc, x) => {
        acc[x.id] = x
        return acc
      }, {})

      // Make sure sessions are sorted in descending order (latest first)
      const expected = [...sessions].sort((a, b) => b.id - a.id)
      const actual = getSessions(state)
      expect(actual).to.be.eql(expected)
    })
  })

  describe('getSession()', () => {

    it('returns a session', () => {
      const sessions = Factory.buildList('session', 3)

      state.sessions.items = sessions.reduce((acc, x) => {
        acc[x.id] = x
        return acc
      }, {})

      expect(getSession(state, sessions[0].id)).to.be.eql(sessions[0])
    })
  })

  describe('isLoadingSessions()', () => {

    it('returns true if sessions are being loaded', () => {
      state.sessions.status = REQUEST_STATUS.GET
      expect(isLoadingSessions(state)).to.be.true
    })

    it('returns false if sessions are not being loaded', () => {
      state.sessions.status = REQUEST_STATUS.NONE
      expect(isLoadingSessions(state)).to.be.false
      state.sessions.status = REQUEST_STATUS.DELETE
      expect(isLoadingSessions(state)).to.be.false
    })
  })
})
