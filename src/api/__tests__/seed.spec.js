import db from '../../db-mock'
import {expect} from 'chai'
import {createExercises, createWorkout} from '../seed'

describe('Seed', () => {

  afterEach(() => {
    return db.exercises.clear()
      .then(() => db.workouts.clear())
  })

  it('createExercises()', () => {
    return createExercises(db)
      .then(() => db.exercises.toArray())
      .then((exercises) => {
        // Check name is correct
        const [pushUps, running, squats, jumpingJacks] = exercises
        expect(running.name).to.be.equal('Running')
        expect(pushUps.name).to.be.equal('Push Ups')
        expect(squats.name).to.be.equal('Squats')
        expect(jumpingJacks.name).to.be.equal('Jumping Jacks')

        // Check each defines 'createdAt' and 'updatedAt'
        exercises.forEach((exercise) => {
          expect(exercise.createdAt instanceof Date).to.be.true
          expect(exercise.updatedAt).to.be.null
        })
      })
  })

  it('createWorkout()', () => {
    return createExercises(db)
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

        // Check workout has self-contained exercises
        workout.exercises.forEach((exercise) => {
          // Exercise details
          expect(exercise).to.be.an('object')
          expect(exercise.name).to.be.a('string')

          // A workout exercise details
          expect(exercise.quantity).to.be.a('number')
          expect(exercise.quantityUnit).to.be.a('string')
          expect(exercise.weight).to.be.a('number')
          expect(exercise.weightUnit).to.be.a('string')

          // Workout's exercise is self-contained
          expect(exercise.id).to.be.equal(undefined)
          expect(exercise.createdAt).to.be.equal(undefined)
          expect(exercise.updatedAt).to.be.equal(undefined)
        })
      })
  })
})
