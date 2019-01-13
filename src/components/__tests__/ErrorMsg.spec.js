import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {ErrorMsg} from '../ErrorMsg'

describe('<ErrorMsg/>', () => {

  it('renders', () => {
    const props = {msg: 'Lorem ipsum'}
    const wrapper = shallow(<ErrorMsg {...props}/>)
    expect(wrapper.find('.wkr-error-msg').text()).to.be.equal(props.msg)
  })
})
