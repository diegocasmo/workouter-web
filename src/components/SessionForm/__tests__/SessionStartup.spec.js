import React from 'react'
import {act} from 'react-dom/test-utils'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {shallow, mount} from 'enzyme'
import {SessionStartup} from '../SessionStartup'
import {Countdown} from '../../Clock/Countdown'
import {WorkoutExerciseItem} from '../../WorkoutDetail/WorkoutExerciseItem'
const moment = require('moment')

describe('<SessionStartup/>', () => {

  let clock
  let props = null
  beforeEach(() => {
    const now = moment()
    props = {
      nextExercise: Factory.build('workout').exercises[0],
      finishAt: moment(now).add(10, 'seconds').valueOf(),
      onSessionStartupCompleted: sinon.spy()
    }
    clock = sinon.useFakeTimers({now: now.valueOf()})
  })

  afterEach(() => {
    clock.restore()
    props = null
  })

  it('renders', () => {
    const wrapper = shallow(<SessionStartup {...props}/>)
    expect(wrapper.find(Countdown)).to.have.lengthOf(1)
    expect(wrapper.find(WorkoutExerciseItem)).to.have.lengthOf(1)
    expect(wrapper.find(WorkoutExerciseItem).props()).to.be.eql(props.nextExercise)
  })

  it('calls onSessionStartupCompleted() when countdown is finished', () => {
    const wrapper = mount(<SessionStartup {...props}/>)
    expect(props.onSessionStartupCompleted.called).to.be.false

    // Assume 12 seconds have passed
    act(() => { clock.tick(12 * 1000) })
    expect(props.onSessionStartupCompleted.called).to.be.true
  })
})
