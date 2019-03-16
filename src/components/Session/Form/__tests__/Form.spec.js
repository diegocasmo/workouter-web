import React from 'react'
import sinon from 'sinon'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {act} from 'react-dom/test-utils'
import {mount} from 'enzyme'
import {BrowserRouter as Router, Prompt} from 'react-router-dom'
import {SessionForm} from '../Form'
import {SessionExercise} from '../Exercise'
import {SessionExerciseRest} from '../ExerciseRest'
import {SessionRoundRest} from '../RoundRest'
import {SessionCompleted} from '../Completed'
import {SessionStartup} from '../Startup'
import {initializeState, SESSION_STATUS} from '../../../../hooks/reducers/new-session-reducer'
const moment = require('moment')

describe('<SessionForm/>', () => {

  let props
  let wrapper
  let clock
  beforeEach(() => {
    props = {
      workout: Factory.build('workout'),
      onCreateSession: () => {},
      onCreateSessionSuccess: sinon.spy(),
      onCreateSessionFailure: () => {}
    }
    clock = sinon.useFakeTimers({now: moment().valueOf()})
  })

  afterEach(() => {
    clock.restore()
  })

  it('renders', () => {
    wrapper = mount(<Router><SessionForm {...props}/></Router>)
    expect(wrapper.find(Prompt).props().when).to.be.true
    expect(wrapper.find(Prompt).props().message).to.be.equal('Are you sure you want to quit this session?')
    expect(wrapper.find(SessionForm)).to.have.lengthOf(1)
    expect(wrapper.find(SessionExercise)).to.have.lengthOf(0)
    expect(wrapper.find(SessionStartup)).to.have.lengthOf(1)
    // Verify first exercise is correctly passed to <SessionStartup/>
    const [firstExercise] = props.workout.exercises
    expect(wrapper.find(SessionStartup).props().nextExercise).to.be.eql(firstExercise)
  })

  it('starts session once initial countdown is finished', () => {
    wrapper = mount(<Router><SessionForm {...props}/></Router>)

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

    wrapper = mount(<Router><SessionForm {...props}/></Router>)

    expect(wrapper.find(Prompt).props().when).to.be.true
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

    wrapper = mount(<Router><SessionForm {...props}/></Router>)

    expect(wrapper.find(Prompt).props().when).to.be.true
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

    wrapper = mount(<Router><SessionForm {...props}/></Router>)

    expect(wrapper.find(Prompt).props().when).to.be.true
    expect(wrapper.find(SessionRoundRest)).to.have.lengthOf(1)

    // Verify <SessionRoundRest/> receives correct props
    const {exercises, rounds, roundsCompleted} = props.init()
    expect(wrapper.find(SessionRoundRest).props().nextExercise).to.be.eql(exercises[0])
    expect(wrapper.find(SessionRoundRest).props().rounds).to.be.equal(rounds)
    expect(wrapper.find(SessionRoundRest).props().roundsCompleted).to.be.equal(roundsCompleted)
  })

  it('renders completed session', () => {
    props = {
      ...props,
      init: () => ({
        ...initializeState(props.workout),
        status: SESSION_STATUS.COMPLETED
      })
    }

    wrapper = mount(<Router><SessionForm {...props}/></Router>)

    expect(wrapper.find(Prompt).props().when).to.be.true
    expect(wrapper.find(SessionCompleted)).to.have.lengthOf(1)

    // Check props passed to <SessionCompleted/> are correct
    const {status, currExercise, ...session} = props.init()
    expect(wrapper.find(SessionCompleted).props().session).to.be.eql(session)
    expect(wrapper.find(SessionCompleted).props().onSubmit).to.be.equal(props.onCreateSession)
    expect(wrapper.find(SessionCompleted).props().onSubmitFailure).to.be.equal(props.onCreateSessionFailure)
  })

  it('doesn\'t render prompt when a session is successfully created', () => {
    props = {
      ...props,
      init: () => ({
        ...initializeState(props.workout),
        status: SESSION_STATUS.COMPLETED
      })
    }

    wrapper = mount(<Router><SessionForm {...props}/></Router>)
    expect(wrapper.find(Prompt).props().when).to.be.true
    expect(props.onCreateSessionSuccess.called).to.be.false

    // Assume session was successfully submitted
    act(() => { wrapper.find(SessionCompleted).props().onSubmitSuccess() })
    wrapper.update()

    expect(wrapper.find(Prompt).props().when).to.be.false
    expect(props.onCreateSessionSuccess.calledOnce).to.be.true
  })
})
