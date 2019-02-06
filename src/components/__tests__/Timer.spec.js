import React from 'react'
import {act} from 'react-dom/test-utils'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {Timer} from '../Timer'
const moment = require('moment')

describe('<Timer/>', () => {

  let clock
  let props
  let wrapper
  beforeEach(() => {
    const now = moment()
    props = {
      startedAt: moment(now).valueOf(),
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
      wrapper = mount(<Timer {...props}/>)
    })
    expect(wrapper.find('.wkr-timer__hours').text()).to.be.equal('00')
    expect(wrapper.find('.wkr-timer__minutes').text()).to.be.equal('00')
    expect(wrapper.find('.wkr-timer__seconds').text()).to.be.equal('00')
  })

  it('updates timer', () => {
    act(() => {
      wrapper = mount(<Timer {...props}/>)
    })

    // Assume 1.5 seconds have passed
    act(() => {
      clock.tick(1.5 * 1000)
    })
    expect(wrapper.find('.wkr-timer__hours').text()).to.be.equal('00')
    expect(wrapper.find('.wkr-timer__minutes').text()).to.be.equal('00')
    expect(wrapper.find('.wkr-timer__seconds').text()).to.be.equal('01')

    // Assume ~2 min have passed
    act(() => {
      clock.tick(119 * 1000)
    })
    expect(wrapper.find('.wkr-timer__hours').text()).to.be.equal('00')
    expect(wrapper.find('.wkr-timer__minutes').text()).to.be.equal('02')
    expect(wrapper.find('.wkr-timer__seconds').text()).to.be.equal('00')
  })
})
