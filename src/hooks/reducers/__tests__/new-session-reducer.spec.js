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

    describe('when it\'s the last exercise of a round', () => {

      let state = null
      beforeEach(() => {
        state = {
          ...initializeState(workout),
          status: SESSION_STATUS.EXERCISE,
          currExercise: workout.exercises.length - 1
        }
      })

      it('starts round rest and sets current exercise to 0', () => {
        const action = {type: ACTIONS.EXERCISE_COMPLETED}
        expect(newSessionReducer(state, action)).to.be.eql({
          ...state,
          status: SESSION_STATUS.ROUND_REST,
          currExercise: 0,
          roundsCompleted: state.roundsCompleted + 1
        })
      })

      it("sets status to 'EXERCISE' if round rest is equal to 0", () => {
        state = {
          ...state,
          restTimePerRound: 0
        }
        const action = {type: ACTIONS.EXERCISE_COMPLETED}
        expect(newSessionReducer(state, action)).to.be.eql({
          ...state,
          status: SESSION_STATUS.EXERCISE,
          currExercise: 0,
          roundsCompleted: state.roundsCompleted + 1
        })
      })
    })

    describe('when it\'s the last exercise of a session', () => {

      let state = null
      beforeEach(() => {
        state = {
          ...initializeState(workout),
          status: SESSION_STATUS.EXERCISE,
          currExercise: workout.exercises.length - 1,
          roundsCompleted: workout.rounds - 1
        }
      })

      it('sets session as completed and sets current exercise to null', () => {
        const action = {type: ACTIONS.EXERCISE_COMPLETED}
        expect(newSessionReducer(state, action)).to.be.eql({
          ...state,
          status: SESSION_STATUS.COMPLETED,
          currExercise: null,
          roundsCompleted: state.roundsCompleted + 1,
          finishedAt: moment().valueOf()
        })
      })

    })

    describe('when it\'s not the last exercise nor the last round', () => {

      let state = null
      beforeEach(() => {
        state = {
          ...initializeState(workout),
          status: SESSION_STATUS.EXERCISE,
          currExercise: 0
        }
      })

      it('starts exercise rest and increments current exercise', () => {
        const action = {type: ACTIONS.EXERCISE_COMPLETED}
        expect(newSessionReducer(state, action)).to.be.eql({
          ...state,
          status: SESSION_STATUS.EXERCISE_REST,
          currExercise: state.currExercise + 1
        })
      })

      it("sets status to 'EXERCISE' if exercise rest is equal to 0", () => {
        state = {
          ...state,
          restTimePerExercise: 0
        }
        const action = {type: ACTIONS.EXERCISE_COMPLETED}
        expect(newSessionReducer(state, action)).to.be.eql({
          ...state,
          status: SESSION_STATUS.EXERCISE,
          currExercise: state.currExercise + 1
        })
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
