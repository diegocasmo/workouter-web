import React from 'react'
import sinon from 'sinon'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {act} from 'react-dom/test-utils'
import {mount} from 'enzyme'
import {SessionForm} from '../SessionForm'
import {SessionExercise} from '../SessionExercise'
import {SessionExerciseRest} from '../SessionExerciseRest'
import {SessionRoundRest} from '../SessionRoundRest'
import {SessionCompleted} from '../SessionCompleted'
import {Countdown} from '../../Countdown'
import {initializeState, SESSION_STATUS} from '../../../hooks/reducers/new-session-reducer'
const moment = require('moment')

describe('<SessionForm/>', () => {

  let props
  let wrapper
  let clock
  beforeEach(() => {
    props = {
      workout: Factory.build('workout')
    }
    clock = sinon.useFakeTimers({now: moment().valueOf()})
  })

  afterEach(() => {
    clock.restore()
  })

  it('renders', () => {
    wrapper = mount(<SessionForm {...props}/>)
    expect(wrapper.find(SessionForm)).to.have.lengthOf(1)
    expect(wrapper.find(SessionExercise)).to.have.lengthOf(0)
    expect(wrapper.find(Countdown)).to.have.lengthOf(1)
  })

  it('starts session once initial countdown is finished', () => {
    wrapper = mount(<SessionForm {...props}/>)

    // Assume initial countdown is finished
    act(() => { clock.tick(12 * 1000) })
    wrapper.update()

    expect(wrapper.find(SessionExercise)).to.have.lengthOf(1)
  })

  it('renders active exercise', () => {
    props = {
      ...props,
      init: () => ({
        ...initializeState(props.workout),
        status: SESSION_STATUS.EXERCISE,
        currExercise: 0
      })
    }
    wrapper = mount(<SessionForm {...props}/>)
    expect(wrapper.find(SessionExercise)).to.have.lengthOf(1)
  })

  it('renders rest time per exercise', () => {
    props = {
      ...props,
      init: () => ({
        ...initializeState(props.workout),
        status: SESSION_STATUS.EXERCISE_REST
      })
    }
    wrapper = mount(<SessionForm {...props}/>)
    expect(wrapper.find(SessionExerciseRest)).to.have.lengthOf(1)
  })

  it('renders rest time per round', () => {
    props = {
      ...props,
      init: () => ({
        ...initializeState(props.workout),
        status: SESSION_STATUS.ROUND_REST
      })
    }
    wrapper = mount(<SessionForm {...props}/>)
    expect(wrapper.find(SessionRoundRest)).to.have.lengthOf(1)
  })

  it('renders completed session', () => {
    props = {
      ...props,
      init: () => ({
        ...initializeState(props.workout),
        status: SESSION_STATUS.COMPLETED
      })
    }
    wrapper = mount(<SessionForm {...props}/>)
    expect(wrapper.find(SessionCompleted)).to.have.lengthOf(1)
  })
})
