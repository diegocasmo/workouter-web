import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { workoutReducer } from './workout/workout-reducer';

const store = createStore(
  combineReducers({ workoutStore: workoutReducer }),
  applyMiddleware(thunk, logger)
);

// Return the Workouter app store
export function getStore() {
  return store;
}
