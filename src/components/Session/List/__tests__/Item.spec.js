import React from 'react'
import { Factory } from 'rosie'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { SessionItem } from '../Item'
import { Link } from 'react-router-dom'
import { Duration } from '../../../Time/Duration'
const moment = require('moment')

describe('<SessionItem/>', () => {
  let clock = null
  let props = null
  beforeEach(() => {
    props = {
      session: Factory.build('session'),
    }
    clock = sinon.useFakeTimers({ now: moment().valueOf() })
  })

  afterEach(() => {
    clock.restore()
    props = null
  })

  it('renders', () => {
    const wrapper = shallow(<SessionItem {...props} />)
    // Link to session's details
    expect(wrapper.find(Link).props().to).to.be.equal(
      `/sessions/${props.session.id}`
    )

    // Session duration
    expect(wrapper.find('.wkr-session-item__name').text()).to.be.equal(
      props.session.name
    )
    expect(wrapper.find(Duration)).to.have.lengthOf(1)
    expect(wrapper.find(Duration).props().start).to.be.equal(
      props.session.startedAt
    )
    expect(wrapper.find(Duration).props().stop).to.be.equal(
      props.session.finishedAt
    )

    // Session time ago
    expect(wrapper.find('.wkr-session-item__time-ago').text()).to.be.equal(
      moment(props.session.finishedAt).fromNow()
    )
  })
})
