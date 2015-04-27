/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the delete workout view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/view_workout/delete_workout_view',
  'lang/en_locale',
],function(DeleteWorkoutView, enLocale) {

  'use strict';

  describe('Delete Workout View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.deleteWorkoutView = new DeleteWorkoutView({
        router: this.router
      });
      this.deleteWorkoutView.render();
    });

    afterEach(function() {
      this.router = null;
      this.deleteWorkoutView = null;
    });

    describe('Delete Workout View Initialization', function() {

      it('is defined', function() {
        expect(this.deleteWorkoutView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.deleteWorkoutView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct class', function() {
        expect(this.deleteWorkoutView.attributes.class).to.equal('delete-workout-view');
      });

    });

    describe('Delete Workout View DOM', function() {

      it('has delete button', function() {
        var deleteButton = this.deleteWorkoutView.$el.find('button#delete-workout');
        expect(deleteButton.length).to.be.equal(1);
      });

    });

    describe('Delete Workout View Events', function() {

      it('listens to delete click', sinon.test(function() {
        var spy = sinon.spy(this.deleteWorkoutView, 'deleteWorkout');
        this.deleteWorkoutView.delegateEvents();
        // simulate user event
        this.deleteWorkoutView.$el.find('button#delete-workout').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    describe('Delete Workout View Methods', function() {

      describe('deleteWorkout Method', function() {


      });

    });

  });
});