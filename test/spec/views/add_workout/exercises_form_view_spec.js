/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the exercises form view.
 */

/*global define, describe, it, afterEach, beforeEach*/
define([
  'views/add_workout/exercises_form_view',
  'models/exercise_model',
  'collections/exercises_collection',
  'lang/en_locale'
],function(ExercisesFormView, ExerciseModel, ExercisesCollection, enLocale) {

  'use strict';

  describe('Exercises Form View', function() {

    beforeEach(function() {
      this.exerciseModel = new ExerciseModel();
      this.router = new Backbone.Router();
      this.exercisesCollection = new ExercisesCollection();
      this.exercisesFormView = new ExercisesFormView({
        router: this.router,
        exerciseModel: this.exerciseModel,
        exercisesCollection: this.exercisesCollection
      });
      this.exercisesFormView.render();
    });

    afterEach(function() {
      this.exercisesCollection = null;
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

      it('knows about the exercises collection', function() {
        expect(this.exercisesFormView.exercisesCollection).to.be.instanceOf(Backbone.Collection);
      });

      it('has correct id', function() {
        expect(this.exercisesFormView.attributes.id).to.equal('exercises-form-view');
      });

    });

    describe('Exercises Form View DOM', function() {

      it('has a exercise title input and attr title', function() {
        var $exerciseTitle = this.exercisesFormView.$el.find('.exercise-title');
        expect($exerciseTitle.length).to.be.equal(1);
        expect($exerciseTitle.attr('placeholder')).to.be.equal(enLocale.addWorkout.exercisesFormView.exerciseTitle.placeholder);

        var exerciseTitleAttr = $exerciseTitle.attr('name');
        expect(exerciseTitleAttr).to.be.equal('title');
      });

      it('must have a button to add exercise', function() {
        var $addExerciseButton = this.exercisesFormView.$el.find('#add-exercise');
        expect($addExerciseButton.length).to.be.equal(1);
        expect($addExerciseButton.text()).to.be.equal(enLocale.addWorkout.exercisesFormView.addExerciseButton.text);
      });

      it('has an elment to show total number of exercises', function() {
        var $exercisesCount = this.exercisesFormView.$el.find('#exercises-total');
        expect($exercisesCount.length).to.be.equal(1);
      });

    });

    describe('Exercises Form View Events', function() {

      it('listens to focusout on input elements', sinon.test(function() {
        var spy = sinon.spy(this.exercisesFormView, 'validateExerciseInput');
        this.exercisesFormView.delegateEvents();
        // simulate user event
        this.exercisesFormView.$el.find('input').trigger('focusout');
        expect(spy.called).to.be.true;
      }));

      // xit('listens to focusin on title input', sinon.test(function() {
      //   var spy = sinon.spy(this.exercisesFormView, 'resetInputValidation');
      //   this.exercisesFormView.delegateEvents();
      //   // simulate user event
      //   this.exercisesFormView.$el.find('.exercise-title').trigger('focusin');
      //   expect(spy.called).to.be.true;
      // }));

      it('listens to click to add exercise', sinon.test(function() {
        var spy = sinon.spy(this.exercisesFormView, 'addExercise');
        this.exercisesFormView.delegateEvents();
        // simulate user event
        this.exercisesFormView.$el.find('#add-exercise').trigger('click');
        expect(spy.called).to.be.true;
      }));

      xit('listens to add event on exercisesCollection', sinon.test(function() {
        var spy = sinon.spy(this.exercisesFormView, 'updateExercisesCount');
        this.exercisesFormView.delegateEvents();
        // simulate user event
        var exerciseModel = new ExerciseModel({
          'title': 'Squads',
          'reps': 12,
          'sets': 5,
          'weight': 135
        });
        this.exercisesCollection.add(exerciseModel);
        expect(spy.called).to.be.true;
      }));

    });

    describe('Exercises Form View Methods', function() {

      describe('validateExerciseInput Method', function() {

        xit('adds input-valid class on valid title', sinon.test(function() {
          var exerciseTitle = 'Legs Day',
              $inputElement = this.exercisesFormView.$el.find('.exercise-title');

          // simulate user add title
          $inputElement.val(exerciseTitle);
          $inputElement.find('.exercise-title').trigger('focusout');

          expect($inputElement.hasClass('input-valid')).to.be.true;
        }));

        xit('adds input-invalid class on invalid title', function() {

        });

      });

      describe('resetInputValidation Method', function() {

        xit('resets input-invalid and input-valid classes', function() {
          var $inputElement = this.exercisesFormView.$el.find('.exercise-title');
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

      describe('resetInputs Method', function() {

        it('resets input val on all form', function() {
          var $inputElement = this.exercisesFormView.$el.find('.exercise-title');
          // add classes to element
          $inputElement.val('test');
          this.exercisesFormView.resetsInputs();
          expect($inputElement.val()).to.be.equal('');
        });

      });

      describe('addExercise Method', function() {

        it('triggers exercise:add if model is valid', sinon.test(function() {
          var spy = sinon.spy();
          sinon.stub(this.exerciseModel, 'isExerciseValid').returns(true);
          this.exercisesFormView.on({
            'exercise:add': spy
          });

          this.exercisesFormView.delegateEvents();
          // simulate user event
          var mock = {
            preventDefault: function() { return false }
          }
          this.exercisesFormView.addExercise(mock);
          expect(spy.called).to.be.true;
        }));

        it('does not trigger exercise:add if model is valid', sinon.test(function() {
          var spy = sinon.spy();
          sinon.stub(this.exerciseModel, 'isExerciseValid').returns(false);
          this.exercisesFormView.on({
            'exercise:add': spy
          });

          this.exercisesFormView.delegateEvents();
          // simulate user event
          var mock = {
            preventDefault: function() { return false }
          }
          this.exercisesFormView.addExercise(mock);
          expect(spy.called).to.be.false;
        }));

        it('should call resetsInputs', sinon.test(function() {
          var spy = sinon.spy(this.exercisesFormView, 'resetsInputs');
          sinon.stub(this.exerciseModel, 'isExerciseValid').returns(true);
          // simulate user event
          var mock = {
            preventDefault: function() { return false }
          }
          this.exercisesFormView.addExercise(mock);
          expect(spy.called).to.be.true;
        }));

      });

      describe('updateExercisesCount Method', function() {

        it('should call getLength of collection', sinon.test(function() {
          var spy = sinon.spy(this.exercisesCollection, 'getLength');
          this.exercisesFormView.updateExercisesCount();
          expect(spy.called).to.be.true;
        }));

        it('should update count on DOM', function() {
          // default value must be 0
          var oldText = this.exercisesFormView.$el.find('#exercises-total').text();
          this.exercisesFormView.updateExercisesCount();
          expect(oldText).to.be.equal('0');

          // simulate user adding a new exercise
          var exerciseModel = new ExerciseModel({
            'title': 'Squads',
            'reps': 12,
            'sets': 5,
            'weight': 135
          });
          this.exercisesCollection.add(exerciseModel);
          this.exercisesFormView.updateExercisesCount();

          // check new value
          var newText = this.exercisesFormView.$el.find('#exercises-total').text();
          expect(newText).to.be.equal('1');
        });

      });

    });

  });
});