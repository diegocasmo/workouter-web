/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the workout form view.
 */

/*global define, describe, it, afterEach, beforeEach*/
define([
  'views/add_workout/workout_form_view',
  'lang/en_locale',
],function(WorkoutFormView, enLocale) {

  'use strict';

  describe('Workout Form View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.workoutFormView = new WorkoutFormView({
        router: this.router
      });
      this.workoutFormView.render();
    });

    afterEach(function() {
      this.router = null;
      this.workoutFormView = null;
    });

    describe('Workout Form View Initialization', function() {

      it('is defined', function() {
        expect(this.workoutFormView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.workoutFormView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.workoutFormView.attributes.id).to.equal('workout-form-view');
      });

    });

    describe('Workout Form View DOM', function() {

      // it('has close button', function() {
      //   var closeButton = this.workoutFormView.$el.find('.close-add-workout-view-button');
      //   expect(closeButton.length).to.be.equal(1);
      //   expect(closeButton.text()).to.be.equal(enLocale.addWorkout.workoutFormView.closeButton.text);
      // });

    });

    describe('Workout Form View Events', function() {

      // it('listens to close click', sinon.test(function() {
      //   var spy = sinon.spy(this.workoutFormView, 'close');
      //   this.workoutFormView.delegateEvents();
      //   // simulate user event
      //   this.workoutFormView.$el.find('.close-add-workout-view-button').trigger('click');
      //   expect(spy.called).to.be.true;
      // }));

    });

    describe('Workout Form View Methods', function() {

      // describe('close Method', function() {

      //   xit('redirects user back to workouts', sinon.test(function() {
      //     var spy = sinon.spy();
      //     this.router.on({
      //       'workouts': spy
      //     });
      //     this.workoutFormView.$el.find('.close-add-workout-view-button').trigger('click');
      //     expect(spy.called).to.be.true;
      //   }));

      // });

    });

  });
});