import db from './db';

// Return a list of workouts
export function fetch() {
  return db.table('workouts').toArray();
}
