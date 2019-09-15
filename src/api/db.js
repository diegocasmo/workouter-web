import Dexie from 'dexie'
import { seedDatabase } from './seed/seed'
const moment = require('moment')

// Initialize Dexie DB
const db = new Dexie('WorkouterDb')
export const TABLES = {
  EXERCISES: 'exercises',
  WORKOUTS: 'workouts',
  SESSIONS: 'sessions',
}

// Specify DB's version schema, which only defines indexed keys
export const SCHEMA = {
  [TABLES.EXERCISES]: '++id,name',
  [TABLES.WORKOUTS]: '++id,name',
  [TABLES.SESSIONS]: '++id,name',
}
db.version(1).stores(SCHEMA)

// Add 'createdAt' and 'updatedAt' timestamps to all tables' records
export function addCreateTimestamps(obj) {
  obj.createdAt = moment().valueOf()
  obj.updatedAt = null
}

// Update 'updatedAt' timestamp when a table record is being updated
export function addUpdateTimestamp(mods) {
  mods.updatedAt = moment().valueOf()
}

// Subscribe to table hooks to perform automatic operations
export const HOOKS = { CREATE: 'creating', UPDATE: 'updating' }
Object.keys(TABLES).forEach(k => {
  db[TABLES[k]].hook(HOOKS.CREATE, (_, obj) => addCreateTimestamps(obj))
  db[TABLES[k]].hook(HOOKS.UPDATE, mods => addUpdateTimestamp(mods))
})

// Seed the database with sample workouts and exercises
db.on('populate', () => seedDatabase(db))

export default db
