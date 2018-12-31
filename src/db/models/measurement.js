import connection from '../db';

// Return an array of measurements
export function fetch(db = connection) {
  return db.measurements.toArray();
}
