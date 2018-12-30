import connection from './db';

// Return a list of workouts
export function fetch(db = connection) {
  return connection.workouts.toArray();
}
