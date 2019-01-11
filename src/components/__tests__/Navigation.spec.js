import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {Navigation} from '../Navigation'
import {Link} from 'react-router-dom'

describe('<Navigation/>', () => {

  it('renders', () => {
    const wrapper = shallow(<Navigation/>)
    expect(wrapper.find({to: '/workouts'})).to.have.lengthOf(1)
    expect(wrapper.find({to: '/exercises'})).to.have.lengthOf(1)
    expect(wrapper.find({to: '/measurements'})).to.have.lengthOf(1)
  })
})
