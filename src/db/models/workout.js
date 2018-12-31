import connection from '../db';

// Return an array of workouts
export function fetch(db = connection) {
  return db.workouts.toArray();
}
