import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer } from './user/reducer'
import { sessionReducer } from './session/reducer'
import { workoutReducer } from './workout/reducer'
import { exerciseReducer } from './exercise/reducer'
import { errorReducer } from './error/reducer'

const store = createStore(
  combineReducers({
    user: userReducer,
    sessions: sessionReducer,
    workouts: workoutReducer,
    exercises: exerciseReducer,
    errors: errorReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

// Return the Workouter app store
export function getStore() {
  return store
}
