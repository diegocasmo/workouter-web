import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {workoutReducer} from './workout/workout-reducer';
import {exerciseReducer} from './exercise/exercise-reducer';

const store = createStore(
  combineReducers({
    workoutStore: workoutReducer,
    exerciseStore: exerciseReducer
  }),
  applyMiddleware(thunk, logger)
);

// Return the Workouter app store
export function getStore() {
  return store;
}
