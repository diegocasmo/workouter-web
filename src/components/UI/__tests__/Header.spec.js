import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Header } from '../Header'

describe('<Header/>', () => {
  it('renders children', () => {
    const text = 'foo bar'
    const wrapper = shallow(
      <Header>
        <p>{text}</p>
      </Header>
    )
    expect(wrapper.find('p').text()).to.be.equal(text)
  })
})
