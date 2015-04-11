/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the exercises form view.
 */

/*global define, describe, it, afterEach, beforeEach*/
define([
  'views/add_workout/exercises_form_view',
  'models/exercise_model',
  'lang/en_locale',
],function(ExercisesFormView, ExerciseModel, enLocale) {

  'use strict';

  describe('Exercises Form View', function() {

    beforeEach(function() {
      this.exerciseModel = new ExerciseModel();
      this.router = new Backbone.Router();
      this.exercisesFormView = new ExercisesFormView({
        router: this.router,
        exerciseModel: this.exerciseModel
      });
      this.exercisesFormView.render();
    });

    afterEach(function() {
      this.exerciseModel = null;
      this.router = null;
      this.exercisesFormView = null;
    });

    describe('Exercises Form View Initialization', function() {

      it('is defined', function() {
        expect(this.exercisesFormView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.exercisesFormView.router).to.be.instanceOf(Backbone.Router);
      });

      it('knows about the exercise model', function() {
        expect(this.exercisesFormView.exerciseModel).to.be.instanceOf(Backbone.Model);
      });

      it('has correct id', function() {
        expect(this.exercisesFormView.attributes.id).to.equal('exercises-form-view');
      });

    });

    xdescribe('Exercises Form View DOM', function() {

      it('has a workout title input', function() {
        var closeButton = this.exercisesFormView.$el.find('.workout-title');
        expect(closeButton.length).to.be.equal(1);
        expect(closeButton.attr('placeholder')).to.be.equal(enLocale.addWorkout.exercisesFormView.workoutTitle.placeholder);
      });

    });

    xdescribe('Exercises Form View Events', function() {

      it('listens to focusout on title input', sinon.test(function() {
        var spy = sinon.spy(this.exercisesFormView, 'validateWorkoutTitle');
        this.exercisesFormView.delegateEvents();
        // simulate user event
        this.exercisesFormView.$el.find('.workout-title').trigger('focusout');
        expect(spy.called).to.be.true;
      }));

      it('listens to focusin on title input', sinon.test(function() {
        var spy = sinon.spy(this.exercisesFormView, 'resetInputValidation');
        this.exercisesFormView.delegateEvents();
        // simulate user event
        this.exercisesFormView.$el.find('.workout-title').trigger('focusin');
        expect(spy.called).to.be.true;
      }));

    });

    xdescribe('Exercises Form View Methods', function() {

      describe('validateWorkoutTitle Method', function() {

        xit('adds input-valid class on valid title', sinon.test(function() {
          var workoutTitle = 'Legs Day';
          var $inputElement = this.exercisesFormView.$el.find('.workout-title');

          // simulate user add title
          $inputElement.val(workoutTitle);
          $inputElement.find('.workout-title').trigger('focusout');

          expect($inputElement.hasClass('input-valid')).to.be.true;
        }));

        xit('adds input-invalid class on invalid title', function() {

        });

      });

      xdescribe('resetInputValidation Method', function() {

        it('resets input-invalid and input-valid classes', function() {
          var $inputElement = this.exercisesFormView.$el.find('.workout-title');
          // add classes to element
          $inputElement.addClass('input-valid input-invalid');
          var mock = {
            preventDefault: function() { return false }
          }
          this.exercisesFormView.resetInputValidation(mock);
          expect($inputElement.hasClass('input-valid')).to.be.false;
          expect($inputElement.hasClass('input-invalid')).to.be.false;
          expect($inputElement.hasClass('workout-title')).to.be.true;
        });

      });

    });

  });
});