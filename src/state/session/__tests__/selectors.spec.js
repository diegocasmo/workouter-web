import { expect } from 'chai'
import { Factory } from 'rosie'
import { initialState } from '../reducer'
import { REQUEST_STATUS } from '../../utils/request-status'
import {
  getSessions,
  getSession,
  isLoadingSessions,
  canLoadMore,
} from '../selectors'

describe('Session Selectors', () => {
  let state
  beforeEach(() => {
    state = { sessions: initialState }
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

  describe('canLoadMore', () => {
    it('returns true if there are more sessions to load and no sessions are being fetched', () => {
      const state = {
        sessions: {
          ...initialState,
          hasMore: true,
          status: REQUEST_STATUS.NONE,
        },
      }
      expect(canLoadMore(state)).to.be.true
    })

    it('returns false if there are no more sessions to load', () => {
      const state = {
        sessions: {
          ...initialState,
          hasMore: false,
        },
      }
      expect(canLoadMore(state)).to.be.false
    })

    it('returns false if sessions are being fetched', () => {
      const state = {
        sessions: {
          ...initialState,
          status: REQUEST_STATUS.GET,
        },
      }
      expect(canLoadMore(state)).to.be.false
    })
  })
})
