import React from 'react'
import { Factory } from 'rosie'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { SessionCompleted } from '../Completed'
import { SessionStatistics } from '../../View/Statistics'

describe('<SessionCompleted/>', () => {
  let wrapper = null
  let props = null
  beforeEach(() => {
    props = {
      session: Factory.build('session', {}, { except: ['id'] }),
      onSubmit: sinon.spy(() => Promise.resolve()),
      onSubmitSuccess: sinon.spy(),
      onSubmitFailure: sinon.spy(),
    }
  })

  it('renders', () => {
    wrapper = shallow(<SessionCompleted {...props} />)
    expect(wrapper.find("button[type='submit']").text()).to.be.equal('Save')
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.false
    expect(wrapper.find(SessionStatistics).props().session).to.be.eql(
      props.session
    )
  })

  it("calls 'onSubmitSuccess()' when session is valid", async () => {
    wrapper = shallow(<SessionCompleted {...props} />)
    expect(props.onSubmit.called).to.be.false
    expect(props.onSubmitSuccess.called).to.be.false

    wrapper
      .find("button[type='submit']")
      .simulate('click', { preventDefault: () => {} })
    await tick()

    expect(props.onSubmit.calledWith(props.session)).to.be.true
    expect(props.onSubmitSuccess.calledOnce).to.be.true
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.false
  })

  it("calls 'onSubmitFailure()' when session is invalid", async () => {
    const errMsg = 'foo bar'
    props = {
      ...props,
      onSubmit: sinon.spy(() => Promise.reject(new Error(errMsg))),
    }
    wrapper = shallow(<SessionCompleted {...props} />)
    expect(props.onSubmit.called).to.be.false
    expect(props.onSubmitFailure.called).to.be.false

    wrapper
      .find("button[type='submit']")
      .simulate('click', { preventDefault: () => {} })
    await tick()

    expect(props.onSubmit.calledWith(props.session)).to.be.true
    expect(props.onSubmitFailure.calledWith(errMsg)).to.be.true
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.false
  })
})

const tick = () => new Promise(resolve => setTimeout(resolve, 0))
