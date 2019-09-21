import { expect } from 'chai'
import { REQUEST_STATUS } from '../request-status'

describe('REQUEST_STATUS', () => {
  it('defines request statuses', () => {
    const statuses = {
      NONE: 'NONE',
      GET: 'GET',
      DELETE: 'DELETE',
      POST: 'POST',
    }

    Object.keys(statuses).forEach(k =>
      expect(REQUEST_STATUS[k]).to.equal(statuses[k])
    )
  })
})
