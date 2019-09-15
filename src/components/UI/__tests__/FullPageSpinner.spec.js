import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { FullPageSpinner } from '../FullPageSpinner'

describe('<FullPageSpinner/>', () => {
  it('renders', () => {
    const text = 'foo bar'
    const wrapper = shallow(<FullPageSpinner text={text} />)
    expect(wrapper.find('.wkr-full-page-spinner__text').text()).to.be.equal(
      text
    )
  })
})
