import * as data from './data.json';

// Return a list of workouts
export function fetch() {
  return Promise.resolve(data.workouts);
}
