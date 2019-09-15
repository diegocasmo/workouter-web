import React from 'react'
import { act } from 'react-dom/test-utils'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Countdown } from '../Countdown'
const moment = require('moment')

describe('<Countdown/>', () => {
  let clock
  let props
  let wrapper
  beforeEach(() => {
    const now = moment()
    props = {
      finishAt: moment(now).add(10, 'seconds'),
      onCountdownCompleted: sinon.spy(),
      extraThreshold: 0,
    }
    clock = sinon.useFakeTimers({ now: now.valueOf() })
  })

  afterEach(() => {
    clock.restore()
    props = null
    wrapper = null
  })

  it('renders', () => {
    wrapper = mount(<Countdown {...props} />)
    expect(wrapper.find('.wkr-duration__hours').text()).to.be.equal('00')
    expect(wrapper.find('.wkr-duration__minutes').text()).to.be.equal('00')
    expect(wrapper.find('.wkr-duration__seconds').text()).to.be.equal('10')
  })

  it('updates countdown', () => {
    wrapper = mount(<Countdown {...props} />)
    expect(wrapper.find('.wkr-duration__seconds').text()).to.be.equal('10')
    // Assume 1.5 seconds have passed
    act(() => {
      clock.tick(1.5 * 1000)
    })
    expect(wrapper.find('.wkr-duration__seconds').text()).to.be.equal('09')
  })

  it("calls 'onCountdownCompleted' when countdown is finished", () => {
    wrapper = mount(<Countdown {...props} />)
    expect(props.onCountdownCompleted.called).to.be.false
    // Assume 12 seconds have passed
    act(() => {
      clock.tick(12 * 1000)
    })
    expect(props.onCountdownCompleted.called).to.be.true
  })
})
