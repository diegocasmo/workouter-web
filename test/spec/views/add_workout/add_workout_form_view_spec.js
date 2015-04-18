/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the add workout form view.
 */

/*global define, describe, it, afterEach, beforeEach, sinon*/
define([
  'views/add_workout/add_workout_form_view',
  'lang/en_locale',
],function(AddWorkoutFormView, enLocale) {

  'use strict';

  describe('Add Workout Form View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.addWorkoutFormView = new AddWorkoutFormView({
        router: this.router
      });
      this.addWorkoutFormView.render();
    });

    afterEach(function() {
      this.router = null;
      this.addWorkoutFormView = null;
    });

    describe('Add Workout Form View Initialization', function() {

      it('is defined', function() {
        expect(this.addWorkoutFormView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.addWorkoutFormView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.addWorkoutFormView.attributes.id).to.equal('add-workout-view');
      });

    });

    describe('Add Workout Form View DOM', function() {

      it('has an add button', function() {
        var addButton = this.addWorkoutFormView.$el.find('button.add-workout');
        expect(addButton.length).to.be.equal(1);
        expect(addButton.text()).to.be.equal(enLocale.addWorkout.addWorkoutFormView.addButton.text);
      });

    });

    describe('Add Workout Form View Events', function() {

      it('listens to add click', sinon.test(function() {
        var spy = sinon.spy(this.addWorkoutFormView, 'addWorkout');
        this.addWorkoutFormView.delegateEvents();
        // simulate user event
        this.addWorkoutFormView.$el.find('button.add-workout').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    describe('Add Workout Form View Methods', function() {

      describe('addWorkout Method', function() {

        it('triggers workout:add', sinon.test(function() {
          var spy = sinon.spy();
          this.addWorkoutFormView.on({
            'workout:add': spy
          });

          this.addWorkoutFormView.delegateEvents();
          // simulate user event
          var mock = {
            preventDefault: function() {
              return false;
            }
          };
          this.addWorkoutFormView.addWorkout(mock);
          expect(spy.called).to.be.true;
        }));

      });

    });

  });
});