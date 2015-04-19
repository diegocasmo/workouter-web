/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the Workout item view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/workouts_home/workout_item_view',
  'lang/en_locale',
],function(WorkoutItemView, enLocale) {

  'use strict';

  describe('Workout Item View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.workoutItemView = new WorkoutItemView({
        router: this.router
      });
      this.workoutItemView.render();
    });

    afterEach(function() {
      this.router = null;
      this.workoutItemView = null;
    });

    describe('Workout Item View Initialization', function() {

      it('is defined', function() {
        expect(this.workoutItemView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.workoutItemView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct class', function() {
        expect(this.workoutItemView.attributes.class).to.equal('workout-item');
      });

    });

    xdescribe('Workout Item View DOM', function() {

      it('has close button', function() {
        var closeButton = this.workoutItemView.$el.find('.close-add-workout-view-button');
        expect(closeButton.length).to.be.equal(1);
        expect(closeButton.text()).to.be.equal(enLocale.addWorkout.workoutItemView.closeButton.text);
      });

    });

    xdescribe('Workout Item View Events', function() {

      it('listens to close click', sinon.test(function() {
        var spy = sinon.spy(this.workoutItemView, 'close');
        this.workoutItemView.delegateEvents();
        // simulate user event
        this.workoutItemView.$el.find('.close-add-workout-view-button').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    xdescribe('Workout Item View Methods', function() {

      describe('close Method', function() {

        xit('redirects user back to workouts', sinon.test(function() {
          var spy = sinon.spy();
          this.router.on({
            'workouts': spy
          });
          this.workoutItemView.$el.find('.close-add-workout-view-button').trigger('click');
          expect(spy.called).to.be.true;
        }));

      });

    });

  });
});