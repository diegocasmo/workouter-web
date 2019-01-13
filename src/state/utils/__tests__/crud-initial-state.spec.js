import {expect} from 'chai'
import {getCRUDInitialState} from '../crud-initial-state'

it('getCRUDInitialState()', () => {
  expect(getCRUDInitialState())
    .to.be.eql({
      items     : {list:    [], errorMsg: null, isLoading: false},
      newItem   : {attrs: null, errors  :   {}, isLoading: false},
      deleteItem: {id:    null, errors  :   {}, isLoading: false}
    })
})
