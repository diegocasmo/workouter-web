import connection from '../db';

// Return an array of measurements
export function fetchMeasurements(db = connection) {
  return db.measurements.toArray();
}
