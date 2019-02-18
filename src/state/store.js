import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {sessionReducer} from './session/session-reducer'
import {workoutReducer} from './workout/workout-reducer'
import {exerciseReducer} from './exercise/exercise-reducer'
import {errorReducer} from './error/error-reducer'

let middleware = [thunk]
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const store = createStore(
  combineReducers({
    sessions: sessionReducer,
    workouts: workoutReducer,
    exercises: exerciseReducer,
    errors: errorReducer
  }),
  applyMiddleware(...middleware)
)

// Return the Workouter app store
export function getStore() {
  return store
}
