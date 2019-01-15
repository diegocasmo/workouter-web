import {expect} from 'chai'
import faker from 'faker'
import {errorReducer, initialState} from '../error-reducer'
import {ERROR} from '../error-actions'

describe('Error Reducer', () => {

  it('should return the initial state', () => {
    expect(errorReducer(undefined, {}))
      .to.be.eql([])
  })

  it('ADD', () => {
    // Assume there are some errors already in state
    const errorMsg1 = faker.lorem.words()
    const errorMsg2 = faker.lorem.words()
    const errorMsg3 = faker.lorem.words()
    const state = [errorMsg1, errorMsg2, errorMsg3]

    // Add a new error message
    const errorMsg = faker.lorem.words()
    const action = {type: ERROR.ADD, errorMsg}
    expect(errorReducer(state, action))
      .to.be.eql([errorMsg1, errorMsg2, errorMsg3, errorMsg])
  })

  it('REMOVE', () => {
    // Assume there are some errors already in state
    const errorMsg1 = faker.lorem.words()
    const errorMsg2 = faker.lorem.words()
    const errorMsg3 = faker.lorem.words()
    const state = [errorMsg1, errorMsg2, errorMsg3]

    // Remove the second error message
    const index = state.indexOf(errorMsg2)
    const action = {type: ERROR.REMOVE, index}
    expect(errorReducer(state, action))
      .to.be.eql([errorMsg1, errorMsg3])
  })
})
