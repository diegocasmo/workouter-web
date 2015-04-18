/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the Add Workout Manager.
 */

/*global define, describe, it, afterEach, beforeEach, sinon*/
define([
  'managers/add_workout_manager',
  'services/firebase_service',
  'models/user_model',
],function(AddWorkoutManager, FirebaseService, UserModel) {

  'use strict';

  describe('Add Workout Manager', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.addWorkoutManager = new AddWorkoutManager({
        router: this.router,
        eventTrigger: 'foo'
      });
    });

    afterEach(function() {
      this.exercisesCollection = null;
      this.addWorkoutManager = null;
      this.router = null;
    });

    describe('Manager Initialization', function() {
      it('is defined', function() {
        expect(this.addWorkoutManager).to.be.ok;
      });

      it('listens to correct event', sinon.test(function() {
        var stub = sinon.stub(this.addWorkoutManager, 'buildChildViews').returns(false),
            spy = sinon.spy(stub);
        this.addWorkoutManager.router.on({
          'foo': spy()
        });
        this.addWorkoutManager.router.trigger('foo');
        expect(spy.called).to.be.true;
      }));

      it('has a user model property', function() {
        expect(this.addWorkoutManager.userModel).to.be.instanceOf(Backbone.Model);
      });

      it('has a workoutModel model property', function() {
        expect(this.addWorkoutManager.workoutModel).to.be.instanceOf(Backbone.Model);
      });

      it('has an exerciseModel model property', function() {
        expect(this.addWorkoutManager.exerciseModel).to.be.instanceOf(Backbone.Model);
      });

      it('has an exercisesCollection model property', function() {
        expect(this.addWorkoutManager.exercisesCollection).to.be.instanceOf(Backbone.Collection);
      });
    });

    describe('Manager methods', function() {

      describe('buildChildViews Method', function() {

        it('must have a buildChildViews method', function() {
          expect(this.addWorkoutManager.buildChildViews).to.be.ok;
        });

        it('should initialize subviews correctly', function() {
          this.addWorkoutManager.childViews = [];
          this.addWorkoutManager.buildChildViews({});
          expect(this.addWorkoutManager.closeAddWorkoutView).to.be.instanceOf(Backbone.View);
          expect(this.addWorkoutManager.workoutFormView).to.be.instanceOf(Backbone.View);
          expect(this.addWorkoutManager.exercisesFormView).to.be.instanceOf(Backbone.View);
          expect(this.addWorkoutManager.addWorkoutFormView).to.be.instanceOf(Backbone.View);
        });

        it('should save childViews correctly', function() {
          this.addWorkoutManager.childViews = [];
          this.addWorkoutManager.buildChildViews({});
          expect(this.addWorkoutManager.childViews.length).to.be.equal(4);
        });

        it('should call the render method', sinon.test(function() {
          var spy = sinon.spy(this.addWorkoutManager, 'render');
          this.addWorkoutManager.buildChildViews({});
          expect(spy.called).to.be.true;
        }));
      });

      describe('destroyChildViews Method', function() {
        it('must have a destroyChildViews method', function() {
          expect(this.addWorkoutManager.destroyChildViews).to.be.ok;
        });
      });

      describe('addUserToWorkout Method', function() {
        beforeEach(function() {
          // create user
          this.userModel = UserModel.getInstance();
          this.userModel.set({
            uid: FirebaseService.oAuthProvider + ':246134729',
            provider: FirebaseService.oAuthProvider,
            token: 'DRiGSnTPwAP6np0lzGMOsOHHpJoUvvq5yUgRNW9qhcU',
            username: 'username',
            displayName: 'Some Name'
          });
        });

        afterEach(function() {
          this.userModel = null;
        });

        it('should set the property user on workout model', function() {
          this.addWorkoutManager.addUserToWorkout();
          var userModelValues = JSON.stringify(this.userModel.toJSON()),
              addWorkoutManagerUser = JSON.stringify(this.addWorkoutManager.workoutModel.get('user'));
          expect(userModelValues).to.be.equal(addWorkoutManagerUser);
        });
      });

      describe('addExerciseToCollection Method', function() {

        it('should call addExercise on collection', sinon.test(function() {
          var spy = sinon.spy(this.addWorkoutManager.exercisesCollection, 'addExercise');
          this.addWorkoutManager.addExerciseToCollection();
          expect(spy.called).to.be.true;
        }));

        it('should call resetExercise on exerciseModel', sinon.test(function() {
          var spy = sinon.spy(this.addWorkoutManager.exerciseModel, 'resetExercise');
          this.addWorkoutManager.addExerciseToCollection();
          expect(spy.called).to.be.true;
        }));

      });

    });

  });
});