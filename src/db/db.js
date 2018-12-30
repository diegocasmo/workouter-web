import Dexie from 'dexie';
import {seedDatabase} from './seed';
import {getSchema,getDbName} from './schema';

const db = new Dexie(getDbName());

db.version(1).stores(getSchema());

// Seed the database with sample workouts and exercises
db.on('populate', () => seedDatabase(db));

export default db;
