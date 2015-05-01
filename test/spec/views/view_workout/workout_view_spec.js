/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the Workout view.
 */

/*global define, describe, xdescribe, it, afterEach, beforeEach*/
define([
  'views/view_workout/workout_view',
  'models/workout_model'
],function(WorkoutView, WorkoutModel) {

  'use strict';

  describe('Workout View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.workoutModel = new WorkoutModel();
      this.workoutItemView = new WorkoutView({
        router: this.router,
        workoutModel: this.workoutModel
      });
      this.workoutItemView.render();
    });

    afterEach(function() {
      this.router = null;
      this.workoutItemView = null;
    });

    describe('Workout View Initialization', function() {

      it('is defined', function() {
        expect(this.workoutItemView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.workoutItemView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct class', function() {
        expect(this.workoutItemView.attributes.class).to.equal('workout-view');
      });

    });

    xdescribe('Workout View DOM', function() {

      it('must have a link to workout exercises', function() {
        expect(this.workoutItemView.$el.find('a').length).to.be.equal(1);
      });

    });
  });

});