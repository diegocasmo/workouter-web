/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the ExerciseModel object.
 */

/*global define, describe, it, afterEach, beforeEach*/
define([
  'models/exercise_model'
],function(ExerciseModel) {

  'use strict';

  describe('Exercise Model', function() {

    beforeEach(function() {
      this.exerciseModel = new ExerciseModel();
      this.exerciseModel.set({
        'id': 1,
        'workoutId': 1,
        'title': 'Squads',
        'reps': 12,
        'sets': 5,
        'weight': 135
      });
    });

    afterEach(function() {
      this.exerciseModel = null;
    });

    describe('Model Initialization', function() {
      beforeEach(function() {
        this.exerciseModel = new ExerciseModel();
      });

      afterEach(function() {
        this.exerciseModel = null;
      });

      it('is defined', function() {
        expect(this.exerciseModel).to.be.ok;
      });

      it('has correct defaults', function() {
        expect(this.exerciseModel.get('id')).to.be.equal(0);
        expect(this.exerciseModel.get('workoutId')).to.be.equal(0);
        expect(this.exerciseModel.get('title')).to.be.equal('');
        expect(this.exerciseModel.get('reps')).to.be.equal(0);
        expect(this.exerciseModel.get('sets')).to.be.equal(0);
        expect(this.exerciseModel.get('weight')).to.be.equal(0);
      });
    });

    describe('Model Validation', function() {

      it('should have valid id', function() {
        this.exerciseModel.set({ 'id': 'invalid' });
        expect(this.exerciseModel.isValid()).to.be.equal(false);

        this.exerciseModel.set({ 'id': 1 });
        expect(this.exerciseModel.isValid()).to.be.equal(true);
      });

      it('should have valid workoutId', function() {
        this.exerciseModel.set({ 'workoutId': 'invalid' });
        expect(this.exerciseModel.isValid()).to.be.equal(false);

        this.exerciseModel.set({ 'workoutId': 1 });
        expect(this.exerciseModel.isValid()).to.be.equal(true);
      });

      it('should have valid title', function() {
        this.exerciseModel.set({ 'title': '' });
        expect(this.exerciseModel.isValid()).to.be.equal(false);

        this.exerciseModel.set({ 'title': 'squads' });
        expect(this.exerciseModel.isValid()).to.be.equal(true);
      });

      it('should have valid reps', function() {
        this.exerciseModel.set({ 'reps': 'string' });
        expect(this.exerciseModel.isValid()).to.be.equal(false);

        this.exerciseModel.set({ 'reps': 12 });
        expect(this.exerciseModel.isValid()).to.be.equal(true);
      });

      it('should have valid sets', function() {
        this.exerciseModel.set({ 'sets': 'string' });
        expect(this.exerciseModel.isValid()).to.be.equal(false);

        this.exerciseModel.set({ 'sets': 5 });
        expect(this.exerciseModel.isValid()).to.be.equal(true);
      });

      it('should have valid weight', function() {
        this.exerciseModel.set({ 'weight': 'string' });
        expect(this.exerciseModel.isValid()).to.be.equal(false);

        this.exerciseModel.set({ 'weight': 120 });
        expect(this.exerciseModel.isValid()).to.be.equal(true);
      });

    });

    describe('Exercise Model Method', function() {

      describe('validateAttr Method', function() {

        it('returns true on valid attr', function() {
          var title = 'Leg Press',
              validateAttrResult = this.exerciseModel.validateAttr('title', title);
          expect(validateAttrResult).to.be.true;
        });

        it('returns false on valid attr', function() {
          var title = '',
              validateAttrResult = this.exerciseModel.validateAttr('title', title);
          expect(validateAttrResult).to.be.false;
        });

      });

    });

  });

});