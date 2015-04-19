/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the Workouts List View.
 */

/*global define, describe, it, afterEach, beforeEach, sinon*/
define([
  'views/workouts_home/workouts_list_view'
],function(WorkoutsListView) {

  'use strict';

  describe('Workouts List View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.workoutsListView = new WorkoutsListView({
        router: this.router
      });
    });

    afterEach(function() {
      this.workoutsListView = null;
      this.router = null;
    });

    describe('Workouts List View Initialization', function() {

      it('is defined', function() {
        expect(this.workoutsListView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.workoutsListView.router).to.be.instanceOf(Backbone.Router);
      });

      it('knows about the workouts collection', function() {
        expect(this.workoutsListView.workoutsCollection).to.be.instanceOf(Backbone.Collection);
      });

      it('calls attachCollectionEvents method', sinon.test(function() {
        var spy = sinon.spy(this.workoutsListView,'attachCollectionEvents');
        this.workoutsListView.initialize({router: this.router});
        expect(spy.called).to.be.true;
      }));

      xit('calls getWorkouts method on collection', sinon.test(function() {
        var spy = sinon.spy(this.workoutsListView.workoutsCollection,'getWorkouts');
        this.workoutsListView.initialize({router: this.router});
        expect(spy.called).to.be.true;
      }));

    });

    describe('Workouts List View Events', function() {

      it('listens to "success" on collection', sinon.test(function() {
        var spy = sinon.spy(this.workoutsListView, 'render');
        sinon.stub(this.workoutsListView.workoutsCollection, 'fetch').yieldsTo('success');
        this.workoutsListView.attachCollectionEvents();
        this.workoutsListView.workoutsCollection.getWorkouts();
        expect(spy.called).to.be.true;
      }));

      it('listens to "error" on collection', sinon.test(function() {
        var spy = sinon.spy(this.workoutsListView, 'errorOnFetch');
        sinon.stub(this.workoutsListView.workoutsCollection, 'fetch').yieldsTo('error');
        this.workoutsListView.attachCollectionEvents();
        this.workoutsListView.workoutsCollection.getWorkouts();
        expect(spy.called).to.be.true;
      }));

    });

    describe('Workouts List View Methods', function() {

      describe('attachCollectionEvents Method', function() {

        it('has an attachCollectionEvents method', function() {
          expect(this.workoutsListView.attachCollectionEvents).to.be.ok;
        });

      });

    });

  });
});