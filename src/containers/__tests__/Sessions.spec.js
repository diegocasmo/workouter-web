import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'
import {Sessions} from '../Sessions'
import {Loading} from '../../components/Loading'
import {SessionList} from '../../components/Session/List/List'
import {SessionItem} from '../../components/Session/List/Item'

describe('<Sessions/>', () => {

  let wrapper
  let props
  beforeEach(() => {
    props = {
      sessions: Factory.buildList('session', 3),
      isLoading: false,
      fetchSessions: sinon.spy()
    }
  })

  afterEach(() => {
    wrapper = null
    props = null
  })

  it('renders', () => {
    wrapper = mount(<Sessions {...props}/>)
    expect(wrapper.find(Sessions).length).to.be.equal(1)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(SessionList)).to.have.lengthOf(1)
    expect(wrapper.find(SessionItem)).to.have.lengthOf(props.sessions.length)
  })

  it("calls 'fetchSessions()'", () => {
    expect(props.fetchSessions.calledOnce).to.be.false
    act(() => { wrapper = mount(<Sessions {...props}/>) })
    expect(props.fetchSessions.calledOnce).to.be.true
  })

  it('renders <Loading/> when fetching sessions', () => {
    props.isLoading = true
    wrapper = mount(<Sessions {...props}/>)
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
    expect(wrapper.find(SessionList)).to.have.lengthOf(0)
  })
})
