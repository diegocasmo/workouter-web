import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { sessionReducer } from './session/reducer'
import { workoutReducer } from './workout/reducer'
import { exerciseReducer } from './exercise/reducer'
import { errorReducer } from './error/reducer'

const store = createStore(
  combineReducers({
    sessions: sessionReducer,
    workouts: workoutReducer,
    exercises: exerciseReducer,
    errors: errorReducer,
  }),
  applyMiddleware(thunk)
)

// Return the Workouter app store
export function getStore() {
  return store
}
