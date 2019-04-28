import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {Navigation} from '../Navigation'

describe('<Navigation/>', () => {

  it('renders', () => {
    const wrapper = shallow(<Navigation/>)
    expect(wrapper.find({to: '/sessions'})).to.have.lengthOf(1)
    expect(wrapper.find({to: '/workouts'})).to.have.lengthOf(1)
    expect(wrapper.find({to: '/exercises'})).to.have.lengthOf(1)
  })
})
