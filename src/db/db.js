import Dexie from 'dexie';
import {seedDatabase} from './seed';

// Db name & schema
const dbName = 'WorkouterDb';
const dbSchema = {
  'units': '++id,&name',
  'exercises': '++id,unitId',
  'workouts': '++id,&name'
};

// Initialize Dexie Db
let db;
if(window.indexedDB) {
  db = new Dexie(dbName);
} else {
  db = new Dexie(dbName, {
    indexedDB: require('fake-indexeddb'),
    IDBKeyRange: require('fake-indexeddb/lib/FDBKeyRange')
  });
}

// Set database schema
db.version(1).stores(dbSchema);

// Extend the exercise class to include its unit
function Exercise() {}
Exercise.prototype.includeUnit = function () {
  return db.units.where({id: this.unitId})
    .first((unit) => ({...this, unit: unit }));
};
db.exercises.mapToClass(Exercise);

// Seed the database with sample workouts and exercises
if(window.indexedDB) {
  db.on('populate', () => seedDatabase(db));
}

export default db;