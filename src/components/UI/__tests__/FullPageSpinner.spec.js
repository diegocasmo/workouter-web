import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { FullPageSpinner } from '../FullPageSpinner'

describe('<FullPageSpinner/>', () => {
  it('renders', () => {
    const text = 'foo bar'
    const wrapper = shallow(
      <FullPageSpinner>
        <p>{text}</p>
      </FullPageSpinner>
    )
    expect(wrapper.find('p').text()).to.be.equal(text)
  })
})
