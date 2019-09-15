import { expect } from 'chai'
import { REQUEST_STATUS } from '../request-status'

describe('REQUEST_STATUS', () => {
  it('defines request statuses', () => {
    expect(REQUEST_STATUS.NONE).to.be.equal('NONE')
    expect(REQUEST_STATUS.GET).to.be.equal('GET')
    expect(REQUEST_STATUS.DELETE).to.be.equal('DELETE')
  })
})
