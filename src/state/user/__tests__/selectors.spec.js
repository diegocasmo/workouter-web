import { expect } from 'chai'
import { Factory } from 'rosie'
import { initialState } from '../reducer'
import { REQUEST_STATUS } from '../../utils/request-status'
import { getUser, isLoading } from '../selectors'

describe('User Selectors', () => {
  let state
  beforeEach(() => {
    state = { user: initialState }
  })

  describe('getUser()', () => {
    it('returns user', () => {
      const user = Factory.build('user')
      state.user.user = user
      expect(getUser(state)).to.be.eql(user)
    })
  })

  describe('isLoading()', () => {
    it('returns true if user is being loaded', () => {
      state.user.status = REQUEST_STATUS.POST
      expect(isLoading(state)).to.be.true
    })

    it('returns false if user is not being loaded', () => {
      const nonLoadingStatuses = Object.values(REQUEST_STATUS).filter(
        v => v !== REQUEST_STATUS.POST
      )
      nonLoadingStatuses.forEach(status => {
        state.user.status = status
        expect(isLoading(state)).to.be.false
      })
    })
  })
})
