import { expect } from 'chai'
import sinon from 'sinon'
import faker from 'faker'
import { initialState } from '../reducer'
import { getErrors } from '../selectors'

describe('Error Selectors', () => {
  let state
  beforeEach(() => {
    state = { errors: initialState }
  })

  describe('getErrors()', () => {
    it('returns a list of errors', () => {
      const errorMsg1 = faker.lorem.words()
      const errorMsg2 = faker.lorem.words()
      const errorMsg3 = faker.lorem.words()
      const errors = [errorMsg1, errorMsg2, errorMsg3]

      expect(
        getErrors({
          ...state,
          errors,
        })
      ).to.be.eql(errors)
    })
  })
})
