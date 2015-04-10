/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the Add Workout Manager.
 */

/*global define, describe, it, afterEach, beforeEach, sinon*/
define([
  'managers/add_workout_manager'
],function(AddWorkoutManager) {

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
      this.addWorkoutManager = null;
      this.router = null;
    });

    describe('Manager Initialization', function() {
      it('is defined', function() {
        expect(this.addWorkoutManager).to.be.ok;
      });

      it('listens to correct event', sinon.test(function() {
        var stub = sinon.stub(this.addWorkoutManager, 'buildChildViews').returns(false),
            spy = sinon.spy(stub)
        this.addWorkoutManager.router.on({
          'foo': spy()
        });
        this.addWorkoutManager.router.trigger('foo');
        expect(spy.called).to.be.true;
      }));

      it('has a user model property', function() {
        expect(this.addWorkoutManager.userModel).to.be.instanceOf(Backbone.Model);
      });
    });

    describe('Manager methods', function() {

      describe('buildChildViews Method', function() {

        it('must have a buildChildViews method', function() {
          expect(this.addWorkoutManager.buildChildViews).to.be.ok;
        });

        it('should initialize subviews correctly', function() {
          this.addWorkoutManager.childViews = [];
          this.addWorkoutManager.buildChildViews();
          expect(this.addWorkoutManager.closeAddWorkoutView).to.be.instanceOf(Backbone.View);
          expect(this.addWorkoutManager.workoutFormView).to.be.instanceOf(Backbone.View);
        });

        it('should save childViews correctly', function() {
          this.addWorkoutManager.childViews = [];
          this.addWorkoutManager.buildChildViews();
          expect(this.addWorkoutManager.childViews.length).to.be.equal(2);
        });

        it('should call the render method', sinon.test(function() {
          var spy = sinon.spy(this.addWorkoutManager, 'render');
          this.addWorkoutManager.buildChildViews();
          expect(spy.called).to.be.true;
        }));
      });

      describe('destroyChildViews Method', function() {
        it('must have a destroyChildViews method', function() {
          expect(this.addWorkoutManager.destroyChildViews).to.be.ok;
        });
      });
    });

  });
});