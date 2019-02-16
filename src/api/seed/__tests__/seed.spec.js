import db, {clearDb} from '../../../test-utils/db-mock'
import {expect} from 'chai'
import {seedDatabase, createExercises, createWorkout} from '../seed'
import {exercises} from '../exercises.json'
import {UNITS} from '../../unit'
const moment = require('moment')

describe('Seed', () => {

  afterEach(() => (clearDb(db)))

  it('seedDatabase()', async () => {
    await seedDatabase(db)
    const dbExercises = await db.exercises.toArray()
    const dbWorkouts = await db.workouts.toArray()
    expect(dbExercises.length).to.be.equal(exercises.length)
    expect(dbWorkouts.length).to.be.equal(1)
  })

  it('createExercises()', async () => {
    await createExercises(db)
    const res = await db.exercises.toArray()
    // Check all exercises were created
    expect(res.length).to.be.equal(exercises.length)
    // Check each defines 'createdAt' and 'updatedAt'
    res.forEach((x) => {
      expect(moment(x.createdAt).isValid()).to.be.true
      expect(x.updatedAt).to.be.null
    })
  })

  it('createWorkout()', async () => {
    await createExercises(db)
    const workoutId = await createWorkout(db)
    const workout = await db.workouts.get(workoutId)
    expect(workout.name).to.be.equal('Full Body')
    expect(workout.rounds).to.be.equal(4)
    expect(workout.restTimePerRound).to.be.equal(60)
    expect(workout.restTimePerExercise).to.be.equal(20)
    expect(workout.exercises.length).to.be.equal(5)
    expect(moment(workout.createdAt).isValid()).to.be.true
    expect(workout.updatedAt).to.be.null

    // Check workout has self-contained exercises
    workout.exercises.forEach((exercise) => {
      // Exercise details
      expect(exercise).to.be.an('object')
      expect(exercise.name).to.be.a('string')
      expect(exercise.quantity).to.be.a('number')
      expect(exercise.quantityUnit).to.be.a('string')
      expect(exercise.weight).to.be.equal(0)
      expect(exercise.weightUnit).to.be.equal(UNITS.KG.value)

      // Workout's exercise is self-contained
      expect(exercise.id).to.be.equal(undefined)
      expect(exercise.createdAt).to.be.equal(undefined)
      expect(exercise.updatedAt).to.be.equal(undefined)
    })
  })
})
