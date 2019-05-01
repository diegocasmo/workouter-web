import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {Navigation} from '../Navigation'

describe('<Navigation/>', () => {

  it('renders', () => {
    const wrapper = shallow(<Navigation/>)
    expect(wrapper.find({to: '/'}).props().children).to.equal('Sessions')
    expect(wrapper.find({to: '/workouts'}).props().children).to.equal('Workouts')
    expect(wrapper.find({to: '/exercises'}).props().children).to.equal('Exercises')
  })
})
