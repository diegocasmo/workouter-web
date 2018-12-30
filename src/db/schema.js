// Return database schema
export const getSchema = () => ({
  'measurements': '++id, &name',
  'exercises': '++id, measurementId, &name'
})

// Return the Db name
export const getDbName = () => ('WorkouterDb');
