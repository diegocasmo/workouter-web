import {expect} from 'chai'
import {initialState} from '../crud-initial-state'

it('initialState', () => {
  expect(initialState)
    .to.be.eql({
      items: {},
      isBusy: false,
      errorMsg: null
    })
})
