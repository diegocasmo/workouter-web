import {Factory} from 'rosie'
import {expect} from 'chai'
import sinon from 'sinon'
import {newSessionReducer, initializeState, SESSION_STATUS, ACTIONS} from '../new-session-reducer'
const moment = require('moment')

describe('New Session Reducer', () => {

  let workout
  let clock
  beforeEach(() => {
    workout = Factory.build('workout', {rounds: 2})
    clock = sinon.useFakeTimers({now: moment().valueOf()})
  })

  afterEach(() => {
    workout = null
    clock.restore()
  })

  it('can initialize reducer state lazily', () => {
    const {name, rounds, restTimePerRound, restTimePerExercise, exercises} = workout
    expect(initializeState(workout)).to.be.eql({
      status: SESSION_STATUS.NONE,
      currExercise: null,
      roundsCompleted: 0,
      startedAt: null,
      finishedAt: null,
      name,
      rounds,
      restTimePerRound,
      restTimePerExercise,
      exercises
    })
  })

  it('defines all actions', () => {
    const actions = {
      START                 : 'SESSION__START',
      EXERCISE_COMPLETED    : 'SESSION__EXERCISE_COMPLETED',
      EXERCISE_REST_COMPETED: 'SESSION__EXERCISE_REST_COMPETED',
      ROUND_REST_COMPETED   : 'SESSION__ROUND_REST_COMPETED'
    }
    Object.keys(actions).forEach((k) => expect(ACTIONS[k]).to.equal(actions[k]))
  })

  it('defines all sessions\' statuses', () => {
    const statuses = {
      NONE         : 'NONE',
      EXERCISE     : 'EXERCISE',
      EXERCISE_REST: 'EXERCISE_REST',
      ROUND_REST   : 'ROUND_REST',
      COMPLETED    : 'COMPLETED'
    }
    Object.keys(statuses).forEach((k) => expect(SESSION_STATUS[k]).to.equal(statuses[k]))
  })

  it('START', () => {
    const state = initializeState(workout)

    const action = {type: ACTIONS.START}
    expect(newSessionReducer(state, action)).to.be.eql({
      ...state,
      status: SESSION_STATUS.EXERCISE,
      currExercise: 0,
      startedAt: moment().valueOf()
    })
  })

  describe('EXERCISE_COMPLETED', () => {

    it('is the last exercise of a round', () => {
      const state = {
        ...initializeState(workout),
        status: SESSION_STATUS.EXERCISE,
        currExercise: workout.exercises.length - 1
      }

      const action = {type: ACTIONS.EXERCISE_COMPLETED}
      expect(newSessionReducer(state, action)).to.be.eql({
        ...state,
        status: SESSION_STATUS.ROUND_REST,
        currExercise: 0,
        roundsCompleted: state.roundsCompleted + 1
      })
    })

    it('is the last exercise and last round', () => {
      const state = {
        ...initializeState(workout),
        status: SESSION_STATUS.EXERCISE,
        currExercise: workout.exercises.length - 1,
        roundsCompleted: workout.rounds - 1
      }

      const action = {type: ACTIONS.EXERCISE_COMPLETED}
      expect(newSessionReducer(state, action)).to.be.eql({
        ...state,
        status: SESSION_STATUS.COMPLETED,
        currExercise: null,
        roundsCompleted: state.roundsCompleted + 1,
        finishedAt: moment().valueOf()
      })
    })

    it('is not the last exercise nor the last round', () => {
      const state = {
        ...initializeState(workout),
        status: SESSION_STATUS.EXERCISE,
        currExercise: 0
      }

      const action = {type: ACTIONS.EXERCISE_COMPLETED}
      expect(newSessionReducer(state, action)).to.be.eql({
        ...state,
        status: SESSION_STATUS.EXERCISE_REST,
        currExercise: state.currExercise + 1
      })
    })
  })

  it('EXERCISE_REST_COMPETED', () => {
    const state = {
      ...initializeState(workout),
      status: SESSION_STATUS.EXERCISE_REST
    }

    const action = {type: ACTIONS.EXERCISE_REST_COMPETED}
    expect(newSessionReducer(state, action)).to.be.eql({
      ...state,
      status: SESSION_STATUS.EXERCISE
    })
  })

  it('ROUND_REST_COMPETED', () => {
    const state = {
      ...initializeState(workout),
      status: SESSION_STATUS.ROUND_REST
    }

    const action = {type: ACTIONS.ROUND_REST_COMPETED}
    expect(newSessionReducer(state, action)).to.be.eql({
      ...state,
      status: SESSION_STATUS.EXERCISE
    })
  })
})
