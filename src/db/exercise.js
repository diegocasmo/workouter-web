import connection from './db';

// Return a list of exercises
export function fetch(db = connection) {
  return db.exercises.toArray();
}
