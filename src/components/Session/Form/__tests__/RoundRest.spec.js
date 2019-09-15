import React from 'react'
import { act } from 'react-dom/test-utils'
import { Factory } from 'rosie'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { SessionRoundRest } from '../RoundRest'
import { RoundsCompleted } from '../../View/RoundsCompleted'
import { Countdown } from '../../../Time/Countdown'
import { WorkoutExerciseItem } from '../../../Workout/View/ExerciseItem'
const moment = require('moment')

describe('<SessionRoundRest/>', () => {
  let clock
  let props = null
  beforeEach(() => {
    const now = moment()
    props = {
      rounds: 4,
      roundsCompleted: 2,
      nextExercise: Factory.build('workout').exercises[0],
      finishAt: moment(now)
        .add(5, 'seconds')
        .valueOf(),
      onRoundRestCompleted: sinon.spy(),
    }
    clock = sinon.useFakeTimers({ now: now.valueOf() })
  })

  afterEach(() => {
    clock.restore()
    props = null
  })

  it('renders', () => {
    const wrapper = shallow(<SessionRoundRest {...props} />)
    // <RoundsCompleted/>
    expect(wrapper.find(RoundsCompleted).props().rounds).to.be.equal(
      props.rounds
    )
    expect(wrapper.find(RoundsCompleted).props().roundsCompleted).to.be.equal(
      props.roundsCompleted
    )

    // <Countdown/>
    expect(wrapper.find(Countdown).props().finishAt).to.be.equal(props.finishAt)
    expect(wrapper.find(Countdown).props().onCountdownCompleted).to.be.equal(
      props.onRoundRestCompleted
    )

    // <WorkoutExerciseItem/>
    expect(wrapper.find(WorkoutExerciseItem)).to.have.lengthOf(1)
    const { className, ...exercise } = wrapper.find(WorkoutExerciseItem).props()
    expect(exercise).to.be.eql(props.nextExercise)
  })

  it('calls onRoundRestCompleted() when countdown is finished', () => {
    const wrapper = mount(<SessionRoundRest {...props} />)
    expect(props.onRoundRestCompleted.called).to.be.false

    // Assume 7 seconds have passed
    act(() => {
      clock.tick(7 * 1000)
    })
    expect(props.onRoundRestCompleted.called).to.be.true
  })
})
