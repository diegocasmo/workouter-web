import React from 'react'
import {act} from 'react-dom/test-utils'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {Countdown} from '../Countdown'
const moment = require('moment')

describe('<Countdown/>', () => {

  let clock
  let props
  let wrapper
  beforeEach(() => {
    const now = moment()
    props = {
      finishAt: moment(now).add(10, 'seconds').valueOf(),
      onCountdownComplete: sinon.spy()
    }
    clock = sinon.useFakeTimers({now: now.valueOf()})
  })

  afterEach(() => {
    clock.restore()
    props = null
    wrapper = null
  })

  it('renders', () => {
    act(() => {
      wrapper = mount(<Countdown {...props}/>)
    })
    expect(wrapper.find('.wkr-countdown__hours').text()).to.be.equal('00')
    expect(wrapper.find('.wkr-countdown__minutes').text()).to.be.equal('00')
    expect(wrapper.find('.wkr-countdown__seconds').text()).to.be.equal('10')
  })

  it('updates countdown', () => {
    act(() => {
      wrapper = mount(<Countdown {...props}/>)
    })
    expect(wrapper.find('.wkr-countdown__seconds').text()).to.be.equal('10')
    // Assume 1.5 seconds have passed
    act(() => {
      clock.tick(1.5 * 1000)
    })
    expect(wrapper.find('.wkr-countdown__seconds').text()).to.be.equal('09')
  })

  it("calls 'onCountdownComplete' when countdown is finished", () => {
    act(() => {
      wrapper = mount(<Countdown {...props}/>)
    })
    expect(props.onCountdownComplete.called).to.be.false
    // Assume 12 seconds have passed
    act(() => {
      clock.tick(12 * 1000)
    })
    expect(props.onCountdownComplete.calledOnce).to.be.true
  })
})
