import {expect} from 'chai'
import {getCRUDInitialState} from '../crud-initial-state'

it('getCRUDInitialState()', () => {
  expect(getCRUDInitialState())
    .to.be.eql({
      items: {},
      isBusy: false,
      errorMsg: null
    })
})
