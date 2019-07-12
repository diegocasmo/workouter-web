import {expect} from 'chai'
import faker from 'faker'
import {ERROR} from '../actions'
import {addError, removeError} from '../action-creators'

describe('Error Action Creators', () => {

  describe('addError()', () => {

    it("dispatches 'ADD' when an Error/string is passed to it", () => {
      const errorMsg = faker.lorem.words()
      const error = new Error(errorMsg)

      // We expect the same action, regardless of the error being passed to it as
      // an Error object or a string
      const expectedAction = {type: ERROR.ADD, errorMsg}

      expect(addError(errorMsg)).to.be.eql(expectedAction)
      expect(addError(error)).to.be.eql(expectedAction)
    })
  })

  describe('removeError()', () => {

    it("dispatches 'REMOVE'", () => {
      const index = faker.random.number()
      const expectedAction = {type: ERROR.REMOVE, index}
      expect(removeError(index)).to.be.eql(expectedAction)
    })
  })
})
