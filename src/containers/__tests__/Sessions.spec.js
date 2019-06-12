import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {BrowserRouter as Router} from 'react-router-dom'
import {Sessions} from '../Sessions'
import {Loading} from '../../components/Loading'
import {SessionListHeader} from '../../components/Session/List/Header'
import {SessionList} from '../../components/Session/List/List'
import {SessionItem} from '../../components/Session/List/Item'
import InfiniteScroll from 'react-infinite-scroller'

describe('<Sessions/>', () => {

  let wrapper
  let props
  beforeEach(() => {
    const sessions = Factory.buildList('session', 3)
    props = {
      sessions,
      canLoadMore: true,
      fetchSessions: sinon.spy(() => Promise.resolve(sessions)),
      fetchClear: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = mount(<Router><Sessions {...props}/></Router>)
    expect(wrapper.find(Sessions).length).to.be.equal(1)

    // Sessions header
    expect(wrapper.find(SessionListHeader)).to.have.lengthOf(1)

    // Infinite scroll
    expect(wrapper.find(InfiniteScroll).props().pageStart).to.be.equal(-1)
    expect(wrapper.find(InfiniteScroll).props().loadMore).to.be.equal(props.fetchSessions)
    expect(wrapper.find(InfiniteScroll).props().hasMore).to.be.equal(props.canLoadMore)

    // Sessions list
    expect(wrapper.find(SessionList)).to.have.lengthOf(1)
    expect(wrapper.find(SessionItem)).to.have.lengthOf(props.sessions.length)
  })

  it("calls 'fetchClear' when component will unmount", () => {
    const wrapper = mount(<Router><Sessions {...props}/></Router>)
    expect(props.fetchClear.calledOnce).to.be.false
    wrapper.unmount()
    expect(props.fetchClear.calledOnce).to.be.true
  })
})
