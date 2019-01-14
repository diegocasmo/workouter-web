import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {workoutReducer} from './workout/workout-reducer'
import {exerciseReducer} from './exercise/exercise-reducer'
import {exerciseMiddleware} from './exercise/exercise-middleware'

const store = createStore(
  combineReducers({
    workouts: workoutReducer,
    exercises: exerciseReducer,
  }),
  applyMiddleware(thunk, logger, exerciseMiddleware)
)

// Return the Workouter app store
export function getStore() {
  return store
}
