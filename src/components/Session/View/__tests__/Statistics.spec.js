import React from 'react'
import { shallow } from 'enzyme'
import { Factory } from 'rosie'
import { expect } from 'chai'
import { SessionStatistics } from '../Statistics'
import { RoundsCompleted } from '../RoundsCompleted'
import { Duration } from '../../../Time/Duration'

describe('<SessionStatistics/>', () => {
  let props = null
  beforeEach(() => {
    props = {
      session: Factory.build('session', {}, { except: ['id'] }),
    }
  })

  it('renders', () => {
    const wrapper = shallow(<SessionStatistics {...props} />)
    // <RoundsCompleted/>
    expect(wrapper.find(RoundsCompleted).props().rounds).to.be.equal(
      props.session.rounds
    )
    expect(wrapper.find(RoundsCompleted).props().roundsCompleted).to.be.equal(
      props.session.roundsCompleted
    )

    // <Duration/>
    expect(wrapper.find(Duration).props().start).to.be.equal(
      props.session.startedAt
    )
    expect(wrapper.find(Duration).props().stop).to.be.equal(
      props.session.finishedAt
    )
  })
})
