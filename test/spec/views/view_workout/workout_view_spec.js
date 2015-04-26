/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the Workout view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/view_workout/workout_view',
  'lang/en_locale',
],function(WorkoutView, enLocale) {

  'use strict';

  describe('Workout View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.workoutItemView = new WorkoutView({
        router: this.router
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