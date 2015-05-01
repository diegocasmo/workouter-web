/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the WorkoutsCollection object.
 */

/*global define, describe, xdescribe, it, afterEach, beforeEach, sinon*/
define([
  'collections/workouts_collection',
  'models/user_model'
],function(WorkoutsCollection, UserModel) {

  'use strict';

  beforeEach(function() {
    this.userModel = UserModel.getInstance();
    this.workoutsCollection = new WorkoutsCollection();
  });

  afterEach(function() {
    this.userModel = null;
    this.workoutsCollection = null;
  });

  describe('Workouts Collection', function() {

    describe('Collection Initialization', function() {
      it('is defined', function() {
        expect(this.workoutsCollection).to.be.ok;
      });

      it('has a model', function() {
        expect(this.workoutsCollection.model).to.exist;
      });
    });

  });

  describe('Workouts Collection Methods', function() {

    xdescribe('addWorkout Method', function() {

    });

    describe('getWorkouts Method', function() {

      it('should trigger "success" on fetch success', sinon.test(function() {
        sinon.stub(this.workoutsCollection, 'fetch').yieldsTo('success');
        var spy = sinon.spy();
        this.workoutsCollection.on({
          'success': spy
        });
        this.workoutsCollection.getWorkouts();
        expect(spy.called).to.be.true;
      }));

      it('should trigger "error" on fetch error', function() {
        sinon.stub(this.workoutsCollection, 'fetch').yieldsTo('error');
        var spy = sinon.spy();
        this.workoutsCollection.on({
          'error': spy
        });
        this.workoutsCollection.getWorkouts();
        expect(spy.called).to.be.true;
      });

    });

    xdescribe('getWorkout Method', function() {

    });

  });

});