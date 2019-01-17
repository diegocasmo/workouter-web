import Dexie from 'dexie'

// Initialize Dexie DB
const dbMock = new Dexie('WorkouterDbTest', {
  indexedDB: require('fake-indexeddb'),
  IDBKeyRange: require('fake-indexeddb/lib/FDBKeyRange')
})
const TABLES = {
  EXERCISES: 'exercises',
  WORKOUTS: 'workouts'
}

// Specify DB's version schema, which only defines indexed keys
let schema = {}
schema[TABLES.EXERCISES] = '++id,name'
schema[TABLES.WORKOUTS] = '++id,name'
dbMock.version(1).stores(schema)

// Add 'createdAt' and 'updatedAt' timestamps to all tables' records
function addCreateTimestamps(obj) {
  obj.createdAt = new Date()
  obj.updatedAt = null
}

// Update 'updatedAt' timestamp when a table record is being updated
function addUpdateTimestamp(mods) {
  mods.updatedAt = new Date()
}

// Subscribe to table hooks to perform automatic operations
const HOOKS = {CREATE: 'creating', UPDATE: 'updating'}
Object.keys(TABLES).forEach((k) => {
  dbMock[TABLES[k]].hook(HOOKS.CREATE, (_, obj) => addCreateTimestamps(obj))
  dbMock[TABLES[k]].hook(HOOKS.UPDATE, (mods) => addUpdateTimestamp(mods))
})

// Clear all database tables
export function clearDb(db = dbMock) {
  return db.exercises.clear()
    .then(() => db.workouts.clear())
}

export default dbMock
