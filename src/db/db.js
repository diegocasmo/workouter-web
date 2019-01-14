import Dexie from 'dexie'
import {seedDatabase} from './seed'

// Initialize Dexie DB
const db = new Dexie('WorkouterDb')
const TABLES = {
  MEASUREMENTS: 'measurements',
  EXERCISES: 'exercises',
  WORKOUTS: 'workouts'
}

// Specify DB's version schema, which only defines indexed keys
let schema = {}
schema[TABLES.MEASUREMENTS] = '++id,name'
schema[TABLES.EXERCISES] = '++id,name'
schema[TABLES.WORKOUTS] = '++id,name'
db.version(1).stores(schema)

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
  db[TABLES[k]].hook(HOOKS.CREATE, (_, obj) => addCreateTimestamps(obj))
  db[TABLES[k]].hook(HOOKS.UPDATE, (mods) => addUpdateTimestamp(mods))
})

// Seed the database with sample workouts and exercises
db.on('populate', () => seedDatabase(db))

export default db
