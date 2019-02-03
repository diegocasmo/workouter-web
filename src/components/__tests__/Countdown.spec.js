const moment = require('moment')
import React from 'react'
import sinon from 'sinon'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {Countdown} from '../Countdown'

describe('<Countdown/>', () => {

  let props
  let clock
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
  })

  it('renders', () => {
    const wrapper = shallow(<Countdown {...props}/>)
    expect(wrapper.find('.wkr-countdown__hours').text()).to.be.equal('00')
    expect(wrapper.find('.wkr-countdown__minutes').text()).to.be.equal('00')
    expect(wrapper.find('.wkr-countdown__seconds').text()).to.be.equal('10')
  })

  it('updates countdown', () => {
    const wrapper = shallow(<Countdown {...props}/>)
    expect(wrapper.find('.wkr-countdown__seconds').text()).to.be.equal('10')
    // Assume 1.5 seconds have passed
    clock.tick(1.5 * 1000)
    expect(wrapper.find('.wkr-countdown__seconds').text()).to.be.equal('09')
  })

  it("calls 'onCountdownComplete' when countdown is finished", () => {
    const wrapper = shallow(<Countdown {...props}/>)
    expect(props.onCountdownComplete.called).to.be.false
    // Assume 12 seconds have passed
    clock.tick(12 * 1000)
    expect(props.onCountdownComplete.calledOnce).to.be.true
  })
})
