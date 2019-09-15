import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Navigation } from '../Navigation'

describe('<Navigation/>', () => {
  it('renders', () => {
    const wrapper = shallow(<Navigation />)
    expect(
      wrapper
        .find({ to: '/' })
        .find('p')
        .text()
    ).to.equal('Sessions')
    expect(
      wrapper
        .find({ to: '/workouts' })
        .find('p')
        .text()
    ).to.equal('Workouts')
    expect(
      wrapper
        .find({ to: '/exercises' })
        .find('p')
        .text()
    ).to.equal('Exercises')
  })
})
