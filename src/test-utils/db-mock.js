import Dexie from 'dexie'
import {TABLES, SCHEMA, HOOKS, addCreateTimestamps, addUpdateTimestamp} from '../api/db'
const moment = require('moment')

// Initialize Dexie DB
const dbMock = new Dexie('WorkouterDbTest', {
  indexedDB: require('fake-indexeddb'),
  IDBKeyRange: require('fake-indexeddb/lib/FDBKeyRange')
})

// Specify DB's version schema, which only defines indexed keys
dbMock.version(1).stores(SCHEMA)

// Subscribe to table hooks to perform automatic operations
Object.keys(TABLES).forEach((k) => {
  dbMock[TABLES[k]].hook(HOOKS.CREATE, (_, obj) => addCreateTimestamps(obj))
  dbMock[TABLES[k]].hook(HOOKS.UPDATE, (mods) => addUpdateTimestamp(mods))
})

// Clear all database tables
export function clearDb(db = dbMock) {
  return db.exercises.clear()
    .then(() => db.workouts.clear())
    .then(() => db.sessions.clear())
}

export default dbMock
