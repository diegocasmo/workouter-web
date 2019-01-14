import db from '../../db-mock'
import {expect} from 'chai'
import {createMeasurements, createExercises, createWorkout} from '../seed'

describe('Seed', () => {

  afterEach(() => {
    return db.measurements.clear()
      .then(() => db.exercises.clear())
      .then(() => db.workouts.clear())
  })

  it('createMeasurements()', () => {
    return createMeasurements(db)
      .then(() => db.measurements.toArray())
      .then(([reps, time]) => {
        expect(reps.name).to.be.equal('reps')
        expect(time.name).to.be.equal('time')
        expect(reps.createdAt instanceof Date).to.be.true
        expect(time.createdAt instanceof Date).to.be.true
        expect(reps.updatedAt).to.be.null
        expect(time.updatedAt).to.be.null
      })
  })

  it('createExercises()', () => {
    return createMeasurements(db)
      .then(() => createExercises(db))
      .then(() => db.exercises.toArray())
      .then((exercises) => {
        // Check name is correct
        const [burpess, pushUps, squats, jumpingJacks] = exercises
        expect(burpess.name).to.be.equal('Burpees')
        expect(pushUps.name).to.be.equal('Push Ups')
        expect(squats.name).to.be.equal('Squats')
        expect(jumpingJacks.name).to.be.equal('Jumping Jacks')

        // Check exercises have a self-contained measurement
        exercises.forEach((exercise) => {
          expect(exercise.measurement).to.be.an('object')
          expect(exercise.measurement.name).to.be.a('string')
          expect(exercise.measurement.id).to.be.equal(undefined)
          expect(exercise.measurement.createdAt).to.be.equal(undefined)
          expect(exercise.measurement.updatedAt).to.be.equal(undefined)
        })

        // Check each defines 'createdAt' and 'updatedAt'
        exercises.forEach((exercise) => {
          expect(exercise.createdAt instanceof Date).to.be.true
          expect(exercise.updatedAt).to.be.null
        })
      })
  })

  it('createWorkout()', () => {
    return createMeasurements(db)
      .then(() => createExercises(db))
      .then(() => createWorkout(db))
      .then(() => db.workouts.toArray())
      .then(([workout]) => {
        expect(workout.name).to.be.equal('Full Body I')
        expect(workout.rounds).to.be.equal(4)
        expect(workout.restTimePerRound).to.be.equal(60)
        expect(workout.restTimePerExercise).to.be.equal(20)
        expect(workout.exercises.length).to.be.equal(4)
        expect(workout.createdAt instanceof Date).to.be.true
        expect(workout.updatedAt).to.be.null

        // Check workout has self-contained exercises with a measurement
        workout.exercises.forEach((exercise) => {
          // Exercise details
          expect(exercise).to.be.an('object')
          expect(exercise.quantity).to.be.a('number')
          expect(exercise.name).to.be.a('string')
          expect(exercise.id).to.be.equal(undefined)
          expect(exercise.createdAt).to.be.equal(undefined)
          expect(exercise.updatedAt).to.be.equal(undefined)

          // Exercise measurement details
          expect(exercise.measurement).to.be.an('object')
          expect(exercise.measurement.name).to.be.a('string')
          expect(exercise.measurement.id).to.be.equal(undefined)
          expect(exercise.measurement.createdAt).to.be.equal(undefined)
          expect(exercise.measurement.updatedAt).to.be.equal(undefined)
        })
      })
  })
})
