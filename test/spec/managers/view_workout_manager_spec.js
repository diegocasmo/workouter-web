/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the View Workout Manager.
 */

/*global define, describe, it, afterEach, beforeEach, sinon*/
define([
  'managers/view_workout_manager',
  'models/workout_model'
],function(ViewWorkoutManager, WorkoutModel) {

  'use strict';

  describe('View Workout Manager', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.options = {
        router: this.router,
        eventTrigger: 'foo'
      }
      this.viewWorkoutManager = new ViewWorkoutManager(this.options);
    });

    afterEach(function() {
      this.viewWorkoutManager = null;
      this.router = null;
    });

    describe('View Workout Manager Initialization', function() {
      it('is defined', function() {
        expect(this.viewWorkoutManager).to.be.ok;
      });

      it('listens to correct event', sinon.test(function() {
        var stub = sinon.stub(this.viewWorkoutManager, 'buildChildViews').returns(false),
            spy = sinon.spy(stub);
        this.viewWorkoutManager.router.on({
          'foo': spy()
        });
        this.viewWorkoutManager.router.trigger('foo');
        expect(spy.called).to.be.true;
      }));

    });

    describe('View Workout Manager methods', function() {

      describe('buildChildViews Method', function() {

        it('must have a buildChildViews method', function() {
          expect(this.viewWorkoutManager.buildChildViews).to.be.ok;
        });

        it('should initialize subviews correctly', function() {
          this.viewWorkoutManager.childViews = [];
          this.viewWorkoutManager.buildChildViews(this.options);
          expect(this.viewWorkoutManager.workoutView).to.be.instanceOf(Backbone.View);
          expect(this.viewWorkoutManager.deleteWorkoutView).to.be.instanceOf(Backbone.View);
          expect(this.viewWorkoutManager.bottomMenuView).to.be.instanceOf(Backbone.View);
        });

        it('should save childViews correctly', function() {
          this.viewWorkoutManager.childViews = [];
          this.viewWorkoutManager.buildChildViews(this.options);
          expect(this.viewWorkoutManager.childViews.length).to.be.equal(3);
        });

        it('should call the render method', sinon.test(function() {
          sinon.stub(this.viewWorkoutManager, 'getSingleWorkout').returns(new WorkoutModel());
          var spy = sinon.spy(this.viewWorkoutManager, 'render');
          this.viewWorkoutManager.buildChildViews(this.options);
          expect(spy.called).to.be.true;
        }));
      });

      describe('destroyChildViews Method', function() {
        it('must have a destroyChildViews method', function() {
          expect(this.viewWorkoutManager.destroyChildViews).to.be.ok;
        });
      });
    });

  });
});