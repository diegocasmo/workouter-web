import {expect} from 'chai'
import {ERROR} from '../actions'

describe('ERROR', () => {

  it('correctly defines all actions', () => {
    const actions = {
      'ADD'   : 'ERROR__ADD',
      'REMOVE': 'ERROR__REMOVE',
    }
    Object.keys(actions).forEach((k) => expect(ERROR[k]).to.equal(actions[k]))
  })
})
