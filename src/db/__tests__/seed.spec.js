import db from '../../db-mock';
import {expect} from 'chai';
import {createMeasurements, createExercises, createWorkout} from '../seed';

describe('Seed', () => {

  afterEach(() => {
    return db.measurements.clear()
      .then(() => db.exercises.clear())
      .then(() => db.workouts.clear());
  });

  it('createMeasurements()', () => {
    return createMeasurements(db)
      .then(() => db.measurements.toArray())
      .then(([reps, time]) => {
        expect(reps.name).to.be.equal('reps');
        expect(time.name).to.be.equal('time');
      });
  });

  it('createExercises()', () => {
    return createMeasurements(db)
      .then(() => createExercises(db))
      .then(() => db.exercises.toArray())
      .then((exercises) => {
        const [burpess, pushUps, squats, jumpingJacks] = exercises;
        // Check name is correct
        expect(burpess.name).to.be.equal('Burpees');
        expect(pushUps.name).to.be.equal('Push Ups');
        expect(squats.name).to.be.equal('Squats');
        expect(jumpingJacks.name).to.be.equal('Jumping Jacks');
        // Check exercises a self-contained measurement with no id
        exercises.forEach((exercise) => {
          expect(exercise.measurement).to.be.an('object');
          expect(exercise.measurement.id).to.be.equal(undefined);
        });
      });
  });

  it('createWorkout()', () => {
    return createMeasurements(db)
      .then(() => createExercises(db))
      .then(() => createWorkout(db))
      .then(() => db.workouts.toArray())
      .then(([workout]) => {
        expect(workout.name).to.be.equal('Full Body I');
        expect(workout.rounds).to.be.equal(4);
        expect(workout.restTimePerRound).to.be.equal(60);
        expect(workout.restTimePerExercise).to.be.equal(20);
        expect(workout.exercises.length).to.be.equal(4);

        // Check exercises are self-contained
        workout.exercises.forEach((exercise) => {
          expect(exercise).to.be.an('object');
          expect(exercise.id).to.be.equal(undefined);
          expect(exercise.quantity).to.be.a('number');
        });
      });
  });
})
