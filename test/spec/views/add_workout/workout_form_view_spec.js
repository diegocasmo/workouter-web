/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the workout form view.
 */

/*global define, describe, it, afterEach, beforeEach, sinon, xit*/
define([
  'views/add_workout/workout_form_view',
  'models/workout_model',
  'lang/en_locale',
],function(WorkoutFormView, WorkoutModel, enLocale) {

  'use strict';

  describe('Workout Form View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.workoutModel = new WorkoutModel();
      this.workoutFormView = new WorkoutFormView({
        router: this.router,
        workoutModel: this.workoutModel
      });
      this.workoutFormView.render();
    });

    afterEach(function() {
      this.router = null;
      this.workoutModel = null;
      this.workoutFormView = null;
    });

    describe('Workout Form View Initialization', function() {

      it('is defined', function() {
        expect(this.workoutFormView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.workoutFormView.router).to.be.instanceOf(Backbone.Router);
      });

      it('knows about the workout model', function() {
        expect(this.workoutFormView.workoutModel).to.be.instanceOf(Backbone.Model);
      });

      it('has correct id', function() {
        expect(this.workoutFormView.attributes.id).to.equal('workout-form-view');
      });

    });

    describe('Workout Form View DOM', function() {

      it('has a workout title input', function() {
        var closeButton = this.workoutFormView.$el.find('.add-workout--title');
        expect(closeButton.length).to.be.equal(1);
        expect(closeButton.attr('placeholder')).to.be.equal(enLocale.addWorkout.workoutFormView.workoutTitle.placeholder);
      });

    });

    describe('Workout Form View Events', function() {

      it('listens to focusout on title input', sinon.test(function() {
        var spy = sinon.spy(this.workoutFormView, 'validateWorkoutTitle');
        this.workoutFormView.delegateEvents();
        // simulate user event
        this.workoutFormView.$el.find('.add-workout--title').trigger('focusout');
        expect(spy.called).to.be.true;
      }));

      it('listens to focusin on title input', sinon.test(function() {
        var spy = sinon.spy(this.workoutFormView, 'resetInputValidation');
        this.workoutFormView.delegateEvents();
        // simulate user event
        this.workoutFormView.$el.find('.add-workout--title').trigger('focusin');
        expect(spy.called).to.be.true;
      }));

    });

    describe('Workout Form View Methods', function() {

      describe('validateWorkoutTitle Method', function() {

        xit('adds input-valid class on valid title', sinon.test(function() {
          var workoutTitle = 'Legs Day';
          var $inputElement = this.workoutFormView.$el.find('.add-workout--title');

          // simulate user add title
          $inputElement.val(workoutTitle);
          $inputElement.find('.add-workout--title').trigger('focusout');

          expect($inputElement.hasClass('input-valid')).to.be.true;
        }));

        xit('adds input-invalid class on invalid title', function() {

        });

      });

      describe('resetInputValidation Method', function() {

        it('resets input-invalid and input-valid classes', function() {
          var $inputElement = this.workoutFormView.$el.find('.add-workout--title');
          // add classes to element
          $inputElement.addClass('input-valid input-invalid');
          var mock = {
            preventDefault: function() {
              return false;
            }
          };
          this.workoutFormView.resetInputValidation(mock);
          expect($inputElement.hasClass('input-valid')).to.be.false;
          expect($inputElement.hasClass('input-invalid')).to.be.false;
          expect($inputElement.hasClass('add-workout--title')).to.be.true;
        });

      });

    });

  });
});