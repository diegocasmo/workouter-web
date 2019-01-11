import connection from '../db';

// Return an array of workouts
export function fetchWorkouts(db = connection) {
  return db.workouts.toArray();
}
