const moment = require('moment')

// A session's actions
export const ACTIONS = {
  START                 : 'SESSION__START',
  EXERCISE_COMPLETED    : 'SESSION__EXERCISE_COMPLETED',
  EXERCISE_REST_COMPETED: 'SESSION__EXERCISE_REST_COMPETED',
  ROUND_REST_COMPETED   : 'SESSION__ROUND_REST_COMPETED'
}

// A session's possible status
export const SESSION_STATUS = {
  NONE         : 'NONE',
  EXERCISE     : 'EXERCISE',
  EXERCISE_REST: 'EXERCISE_REST',
  ROUND_REST   : 'ROUND_REST',
  COMPLETED    : 'COMPLETED'
}

// Initialize reducer state lazily
export const initializeState = ({name, rounds, restTimePerRound, restTimePerExercise, exercises}) => ({
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

export const newSessionReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START:
      return {
        ...state,
        status: SESSION_STATUS.EXERCISE,
        currExercise: 0,
        startedAt: moment().valueOf()
      }
    case ACTIONS.EXERCISE_COMPLETED: {
      const isLastExercise = state.currExercise === state.exercises.length - 1
      const isLastRound = state.roundsCompleted === state.rounds - 1
      if(isLastExercise && isLastRound) {
        return {
          ...state,
          status: SESSION_STATUS.COMPLETED,
          currExercise: null,
          roundsCompleted: state.roundsCompleted + 1,
          finishedAt: moment().valueOf()
        }
      } else if(isLastExercise) {
        return {
          ...state,
          status: state.restTimePerRound === 0
                    ? SESSION_STATUS.EXERCISE
                    : SESSION_STATUS.ROUND_REST,
          currExercise: 0,
          roundsCompleted: state.roundsCompleted + 1
        }
      } else {
        return {
          ...state,
          status: state.restTimePerExercise === 0
                    ? SESSION_STATUS.EXERCISE
                    : SESSION_STATUS.EXERCISE_REST,
          currExercise: state.currExercise + 1
        }
      }
    }
    case ACTIONS.EXERCISE_REST_COMPETED:
    case ACTIONS.ROUND_REST_COMPETED:
      return {
        ...state,
        status: SESSION_STATUS.EXERCISE
      }

    default:
      return state
  }
}
