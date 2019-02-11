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
import {SessionStartup} from '../SessionStartup'
import {initializeState, SESSION_STATUS} from '../../../hooks/reducers/new-session-reducer'
const moment = require('moment')

describe('<SessionForm/>', () => {

  let props
  let wrapper
  let clock
  beforeEach(() => {
    props = {
      workout: Factory.build('workout'),
      onCreateSession: () => {},
      onCreateSessionSuccess: () => {},
      onCreateSessionFailure: () => {}
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
    expect(wrapper.find(SessionStartup)).to.have.lengthOf(1)
    // Verify first exercise is correctly passed to <SessionStartup/>
    const [firstExercise] = props.workout.exercises
    expect(wrapper.find(SessionStartup).props().nextExercise).to.be.eql(firstExercise)
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
        status: SESSION_STATUS.EXERCISE_REST,
        currExercise: 0
      })
    }
    wrapper = mount(<SessionForm {...props}/>)
    expect(wrapper.find(SessionExerciseRest)).to.have.lengthOf(1)
    // Verify upcoming exercise is correctly passed to <SessionExerciseRest/>
    const {currExercise, exercises} = props.init()
    expect(wrapper.find(SessionExerciseRest).props().nextExercise).to.be.eql(exercises[currExercise])
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
    // Verify upcoming exercise is correctly passed to <SessionRoundRest/>
    const [firstExercise] = props.init().exercises
    expect(wrapper.find(SessionRoundRest).props().nextExercise).to.be.eql(firstExercise)
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

    // Check props passed to <SessionCompleted/> are correct
    const {status, currExercise, ...session} = props.init()
    expect(wrapper.find(SessionCompleted).props().session).to.be.eql(session)
    expect(wrapper.find(SessionCompleted).props().onSubmit).to.be.equal(props.onCreateSession)
    expect(wrapper.find(SessionCompleted).props().onSubmitSuccess).to.be.equal(props.onCreateSessionSuccess)
    expect(wrapper.find(SessionCompleted).props().onSubmitFailure).to.be.equal(props.onCreateSessionFailure)
  })
})
