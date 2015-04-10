/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the WorkoutModel object.
 */

/*global define, describe, it, afterEach, beforeEach*/
define([
  'models/workout_model',
  'collections/exercises_collection',
  'models/exercise_model',
  'models/user_model',
  'services/firebase_service'
],function(WorkoutModel, ExercisesCollection, ExerciseModel, UserModel, FirebaseService) {

  'use strict';

  beforeEach(function() {
    this.workoutModel = new WorkoutModel();
  });

  afterEach(function() {
    this.workoutModel = null;
  });

  describe('Workout Model', function() {

    describe('Model Initialization', function() {
      it('is defined', function() {
        expect(this.workoutModel).to.be.ok;
      });

      it('has correct defaults', function() {
        expect(this.workoutModel.get('id')).to.be.equal(0);
        expect(this.workoutModel.get('title')).to.be.equal('');
        expect(this.workoutModel.get('user')).to.be.an.instanceOf(Object);
        expect(this.workoutModel.get('date')).to.be.an.instanceOf(Date);
        expect(this.workoutModel.get('exercises')).to.be.an.instanceOf(Array);
      });
    });

    describe('Model Validation', function() {
      beforeEach(function() {
        // create exercise
        this.exercise = new ExerciseModel();
        this.exercise.set({
          'id': 1,
          'workoutId': 1,
          'title': 'Squads',
          'reps': 12,
          'sets': 5,
          'weight': 135
        });

        // add exercise to collection
        this.exercisesCollection = new ExercisesCollection();
        this.exercisesCollection.add(this.exercise);

        // create workout
        this.workoutModel = new WorkoutModel();
        this.userModel = UserModel.getInstance();
        this.userModel.set({
          uid: FirebaseService.oAuthProvider + ':246134729',
          provider: FirebaseService.oAuthProvider,
          token: 'DRiGSnTPwAP6np0lzGMOsOHHpJoUvvq5yUgRNW9qhcU',
          username: 'username',
          displayName: 'Some Name'
        });

        this.workoutModel.set({
          'id': 1,
          'title': 'Leg Day',
          'user': this.userModel.toJSON(),
          'date': new Date(),
          'exercises': this.exercisesCollection.toJSON()
        });
      });

      afterEach(function() {
        this.workoutModel = null;
        this.exercisesCollection = null;
        this.exercise = null;
        this.userModel = null;
      });

      it('should have valid id', function() {
        expect(this.workoutModel.isValid()).to.be.equal(true);

        this.workoutModel.set({ 'id': '' });
        expect(this.workoutModel.isValid()).to.be.equal(false);
      });

      it('should have valid title', function() {
        this.workoutModel.set({ 'title': '' });
        expect(this.workoutModel.isValid()).to.be.equal(false);

        this.workoutModel.set({ 'title': 'Leg Day' });
        expect(this.workoutModel.isValid()).to.be.equal(true);
      });

      it('should have valid user', function() {
        expect(this.workoutModel.isValid()).to.be.equal(true);

        this.workoutModel.set({ 'user': '' });
        expect(this.workoutModel.isValid()).to.be.equal(false);
      });

      it('should have valid date', function() {
        this.workoutModel.set({ 'date': '2/5/1992' });
        expect(this.workoutModel.isValid()).to.be.equal(false);

        this.workoutModel.set({ 'date': new Date() });
        expect(this.workoutModel.isValid()).to.be.equal(true);
      });

      it('should have valid exercises', function() {
        this.workoutModel.set({ 'exercises': [] });
        expect(this.workoutModel.isValid()).to.be.equal(false);

        this.workoutModel.set({ 'exercises': this.exercisesCollection.toJSON() });
        expect(this.workoutModel.isValid()).to.be.equal(true);
      });
    });
  });

  describe('Workout Model Methods', function() {

    describe('setCurrentUser Method', function() {

      it('should set the workout\'s user owner', function() {
        var validAttrs = {
          uid: FirebaseService.oAuthProvider + ':246134729',
          provider: FirebaseService.oAuthProvider,
          token: 'DRiGSnTPwAP6np0lzGMOsOHHpJoUvvq5yUgRNW9qhcU',
          username: 'username',
          displayName: 'Some Name'
        };

        var success = this.workoutModel.setCurrentUser(validAttrs);
        expect(success).to.be.true;
      });

      it('should return false if attrs are invalid', function() {
        var invalidAttrs = {
          uid: 'novalid246134729',
          provider: 'invalid',
          token: 'DRiGSnTPwAP6np0lzGMOsOHHpJoUvvq5yUgRNW9qhcU',
          username: 'username',
          displayName: 'Some Name'
        };

        var success = this.workoutModel.setCurrentUser(invalidAttrs);
        expect(success).to.be.false;
      });

    });

  });

});