import React from 'react'
import { Factory } from 'rosie'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { SessionList } from '../List'
import { SessionItem } from '../Item'

describe('<SessionList/>', () => {
  let props = null
  beforeEach(() => {
    props = {
      hasMore: false,
      sessions: Factory.buildList('session', 3),
    }
  })

  it('renders', () => {
    const wrapper = shallow(<SessionList {...props} />)
    expect(wrapper.find(SessionItem)).to.have.lengthOf(props.sessions.length)
  })

  it('does not render there are no sessions message when `hasMore` is true', () => {
    props = {
      ...props,
      hasMore: true,
      sessions: [],
    }
    const wrapper = shallow(<SessionList {...props} />)
    expect(wrapper.find('p')).to.have.lengthOf(0)
    expect(wrapper.find(SessionItem)).to.have.lengthOf(0)
  })

  it('renders a message when there are no sessions', () => {
    props = {
      ...props,
      hasMore: false,
      sessions: [],
    }
    const wrapper = shallow(<SessionList {...props} />)
    expect(wrapper.find(SessionItem)).to.have.lengthOf(0)
    expect(wrapper.find('p').text()).to.be.equal(
      'There are no sessions to show'
    )
  })
})
