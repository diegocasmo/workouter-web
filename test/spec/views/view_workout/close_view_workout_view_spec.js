/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the close view workout view.
 */

/*global define, describe, xdescribe, it, afterEach, beforeEach, sinon*/
define([
  'views/view_workout/close_view_workout_view'
],function(CloseViewWorkoutView) {

  'use strict';

  describe('Close View Workout View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.closeViewWorkoutView = new CloseViewWorkoutView({
        router: this.router
      });
      this.closeViewWorkoutView.render();
    });

    afterEach(function() {
      this.router = null;
      this.closeViewWorkoutView = null;
    });

    describe('Close View Workout View Initialization', function() {

      it('is defined', function() {
        expect(this.closeViewWorkoutView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.closeViewWorkoutView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.closeViewWorkoutView.attributes.id).to.equal('close-view-workout-view');
      });

    });

    describe('Close View Workout View DOM', function() {

      it('has close icon', function() {
        var closeIcon = this.closeViewWorkoutView.$el.find('i.fa-close');
        expect(closeIcon.length).to.be.equal(1);
      });

    });

    describe('Close View Workout View Events', function() {

      it('listens to close click', sinon.test(function() {
        var spy = sinon.spy(this.closeViewWorkoutView, 'close');
        this.closeViewWorkoutView.delegateEvents();
        // simulate user event
        this.closeViewWorkoutView.$el.find('i.fa-close').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    describe('Close View Workout View Methods', function() {

      xdescribe('close Method', function() {

        it('redirects user back to workouts', sinon.test(function() {
          var spy = sinon.spy();
          this.closeViewWorkoutView.router.on({
            'workouts': spy
          });
          this.closeViewWorkoutView.close({preventDefault: function() { } });
          expect(spy.called).to.be.true;
        }));

      });

    });

  });
});