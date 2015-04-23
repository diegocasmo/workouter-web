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
      this.model = new Backbone.Model({
        id: '-JnU0ZeNyNEWThAW-xOp',
        title: 'title',
        date: Date.now()
      });
      this.workoutItemView = new WorkoutItemView({
        router: this.router
      });
      this.workoutItemView.workoutModel = this.model;
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

    describe('Workout Item View DOM', function() {

      it('must have a link to workout exercises', function() {
        expect(this.workoutItemView.$el.find('a').length).to.be.equal(1);
      });

    });
  });

});