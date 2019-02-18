import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {SessionList} from '../SessionList'
import {SessionItem} from '../SessionItem'

describe('<SessionList/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      sessions: Factory.buildList('session', 3)
    }
  })

  it('renders', () => {
    const wrapper = shallow(<SessionList {...props}/>)
    expect(wrapper.find(SessionItem)).to.have.lengthOf(props.sessions.length)
  })

  it('renders a message when there are no sessions', () => {
    props = {
      ...props,
      sessions: []
    }
    const wrapper = shallow(<SessionList {...props}/>)
    expect(wrapper.find(SessionItem)).to.have.lengthOf(0)
    expect(wrapper.find('p').text()).to.be.equal('There are no sessions to show')
  })
})
