import db, { clearDb } from '../../../test-utils/db-mock'
import { expect } from 'chai'
import { seedDatabase, createExercises, createWorkouts } from '../seed'
import { exercises } from '../exercises.json'
import { workouts } from '../workouts.json'
const moment = require('moment')

describe('Seed', () => {
  afterEach(() => clearDb(db))

  it('seedDatabase()', async () => {
    await seedDatabase(db)
    const [dbExercises, dbWorkouts] = await Promise.all([
      db.exercises.toArray(),
      db.workouts.toArray(),
    ])
    expect(dbExercises.length).to.be.equal(exercises.length)
    expect(dbWorkouts.length).to.be.equal(workouts.length)
  })

  it('createExercises()', async () => {
    await createExercises(db)
    const res = await db.exercises.toArray()
    // Check all exercises were created
    expect(res.length).to.be.equal(exercises.length)
    // Check each defines 'createdAt' and 'updatedAt'
    res.forEach(x => {
      expect(moment(x.createdAt).isValid()).to.be.true
      expect(x.updatedAt).to.be.null
    })
  })

  it('createWorkouts()', async () => {
    await createWorkouts(db)
    const res = await db.workouts.toArray()
    // Check all workouts were created
    expect(res.length).to.be.equal(workouts.length)
    // Check each defines 'createdAt' and 'updatedAt'
    res.forEach(x => {
      expect(moment(x.createdAt).isValid()).to.be.true
      expect(x.updatedAt).to.be.null
    })
  })
})
