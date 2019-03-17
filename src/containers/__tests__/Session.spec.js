import React from 'react'
import {act} from 'react-dom/test-utils'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {mount} from 'enzyme'
import {expect} from 'chai'
import {Session} from '../Session'
import {Loading} from '../../components/Loading'
import {SessionView} from '../../components/Session/View/View'

describe('<Session>', () => {

  let props
  beforeEach(() => {
    props = {
      sessionId: 10,
      session: Factory.build('session', {id: 10}),
      isLoading: false,
      getSession: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = mount(<Session {...props}/>)
    // <Loading/>
    expect(wrapper.find(Loading)).to.have.lengthOf(0)

    // <SessionView/>
    expect(wrapper.find(SessionView).props().session).to.be.eql(props.session)
  })

  it("calls 'getSession()'", () => {
    expect(props.getSession.calledOnce).to.be.false
    let wrapper
    act(() => { wrapper = mount(<Session {...props}/>) })
    expect(props.getSession.calledOnce).to.be.true
    expect(props.getSession.calledWith(props.sessionId)).to.be.true
  })

  it('renders <Loading/> when fetching session', () => {
    props = {
      ...props,
      isLoading: true
    }
    const wrapper = mount(<Session {...props}/>)

    // <Loading/>
    expect(wrapper.find(Loading)).to.have.lengthOf(1)

    // <SessionView/>
    expect(wrapper.find(SessionView)).to.have.lengthOf(0)
  })
})
