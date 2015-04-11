/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the close add workout view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/add_workout/close_add_workout_view',
  'lang/en_locale',
],function(CloseAddWorkoutView, enLocale) {

  'use strict';

  describe('Close Add Workout View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.closeAddWorkoutView = new CloseAddWorkoutView({
        router: this.router
      });
      this.closeAddWorkoutView.render();
    });

    afterEach(function() {
      this.router = null;
      this.closeAddWorkoutView = null;
    });

    describe('Close Add Workout View Initialization', function() {

      it('is defined', function() {
        expect(this.closeAddWorkoutView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.closeAddWorkoutView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.closeAddWorkoutView.attributes.id).to.equal('close-add-workout-view');
      });

    });

    describe('Close Add Workout View DOM', function() {

      it('has close button', function() {
        var closeButton = this.closeAddWorkoutView.$el.find('.close-add-workout-view-button');
        expect(closeButton.length).to.be.equal(1);
        expect(closeButton.text()).to.be.equal(enLocale.addWorkout.closeAddWorkoutView.closeButton.text);
      });

    });

    describe('Close Add Workout View Events', function() {

      it('listens to close click', sinon.test(function() {
        var spy = sinon.spy(this.closeAddWorkoutView, 'close');
        this.closeAddWorkoutView.delegateEvents();
        // simulate user event
        this.closeAddWorkoutView.$el.find('.close-add-workout-view-button').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    describe('Close Add Workout View Methods', function() {

      describe('close Method', function() {

        xit('redirects user back to workouts', sinon.test(function() {
          var spy = sinon.spy();
          this.router.on({
            'workouts': spy
          });
          this.closeAddWorkoutView.$el.find('.close-add-workout-view-button').trigger('click');
          expect(spy.called).to.be.true;
        }));

      });

    });

  });
});