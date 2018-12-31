import connection from '../db';

// Return an array of exercises
export function fetch(db = connection) {
  return db.exercises.toArray();
}
