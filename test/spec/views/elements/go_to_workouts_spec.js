/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the Go To Workouts view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/elements/go_to_workouts'
],function(GoToWorkouts) {

  'use strict';

  describe('Go To Workouts', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.goToWorkouts = new GoToWorkouts({
        router: this.router
      });
      this.goToWorkouts.render();
    });

    afterEach(function() {
      this.router = null;
      this.goToWorkouts = null;
    });

    describe('Go To Workouts Initialization', function() {

      it('is defined', function() {
        expect(this.goToWorkouts).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.goToWorkouts.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.goToWorkouts.attributes.id).to.equal('go-to-workouts-view');
      });

    });

    describe('Go To Workouts DOM', function() {

      it('has close icon', function() {
        var closeIcon = this.goToWorkouts.$el.find('i.fa-times');
        expect(closeIcon.length).to.be.equal(1);
      });

    });

    describe('Go To Workouts Events', function() {

      it('listens to click on go back icon', sinon.test(function() {
        var spy = sinon.spy(this.goToWorkouts, 'goToWorkouts');
        this.goToWorkouts.delegateEvents();
        // simulate user event
        this.goToWorkouts.$el.find('i.fa-times').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    describe('Go To Workouts Methods', function() {

      describe('goToWorkouts Method', function() {

        xit('redirects user back to workouts', sinon.test(function() {
        }));

      });

    });

  });
});