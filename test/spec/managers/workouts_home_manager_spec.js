/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the Workouts Home Manager.
 */

/*global define, describe, it, afterEach, beforeEach, sinon*/
define([
  'managers/workouts_home_manager'
],function(WorkoutsHomeManager) {

  'use strict';

  describe('Workouts Home Manager', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.workoutsHomeManager = new WorkoutsHomeManager({
        router: this.router,
        eventTrigger: 'foo'
      });
    });

    afterEach(function() {
      this.workoutsHomeManager = null;
      this.router = null;
    });

    describe('Workouts Home Manager Initialization', function() {
      it('is defined', function() {
        expect(this.workoutsHomeManager).to.be.ok;
      });

      it('listens to correct event', sinon.test(function() {
        var stub = sinon.stub(this.workoutsHomeManager, 'buildChildViews').returns(false),
            spy = sinon.spy(stub);
        this.workoutsHomeManager.router.on({
          'foo': spy()
        });
        this.workoutsHomeManager.router.trigger('foo');
        expect(spy.called).to.be.true;
      }));
    });

    describe('Workouts Home Manager methods', function() {

      describe('buildChildViews Method', function() {

        it('must have a buildChildViews method', function() {
          expect(this.workoutsHomeManager.buildChildViews).to.be.ok;
        });

        it('should initialize subviews correctly', function() {
          this.workoutsHomeManager.childViews = [];
          this.workoutsHomeManager.buildChildViews();
          expect(this.workoutsHomeManager.bottomMenuView).to.be.instanceOf(Backbone.View);
        });

        it('should save childViews correctly', function() {
          this.workoutsHomeManager.childViews = [];
          this.workoutsHomeManager.buildChildViews();
          expect(this.workoutsHomeManager.childViews.length).to.be.equal(1);
        });

      });

      describe('destroyChildViews Method', function() {
        it('must have a destroyChildViews method', function() {
          expect(this.workoutsHomeManager.destroyChildViews).to.be.ok;
        });
      });
    });

  });
});