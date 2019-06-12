import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {SessionListHeader} from '../Header'

describe('<SessionListHeader/>', () => {

  it('renders', () => {
    const wrapper = shallow(<SessionListHeader/>)
    expect(wrapper.find('.wkr-session-list-header__title').text()).to.be.equal('Sessions')
  })
})
