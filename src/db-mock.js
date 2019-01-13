import Dexie from 'dexie'

const dbMock = new Dexie('WorkouterDbTest', {
  indexedDB: require('fake-indexeddb'),
  IDBKeyRange: require('fake-indexeddb/lib/FDBKeyRange')
})

dbMock.version(1).stores({
  'measurements': '++id,name',
  'exercises': '++id,name',
  'workouts': '++id,name'
})

export default dbMock
