/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the add first workout view.
 */

/*global define, describe, it, afterEach, beforeEach*/
define([
  'views/workouts_home/add_first_workout_view',
  'lang/en_locale',
],function(AddFirstWorkoutView, enLocale) {

  'use strict';

  describe('Add First Workout View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.addFirstWorkoutView = new AddFirstWorkoutView({
        router: this.router
      });
      this.addFirstWorkoutView.render();
    });

    afterEach(function() {
      this.router = null;
      this.addFirstWorkoutView = null;
    });

    describe('Add First Workout View Initialization', function() {

      it('is defined', function() {
        expect(this.addFirstWorkoutView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.addFirstWorkoutView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct class', function() {
        expect(this.addFirstWorkoutView.attributes.id).to.equal('add-first-workout-view');
      });

    });

    describe('Add First Workout View DOM', function() {

      it('has an add workout message', function() {
        var addWorkoutMsg = this.addFirstWorkoutView.$el.find('p.add-workout-msg');
        expect(addWorkoutMsg.length).to.be.equal(1);
        expect(addWorkoutMsg.text()).to.be.equal(enLocale.workoutsHome.addFirstWorkoutView.addWorkoutMsg);
      });

    });

  });

});