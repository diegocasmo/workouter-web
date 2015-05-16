/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the go back view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/elements/go_back_view'
],function(GoBackView) {

  'use strict';

  describe('Go Back View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.router.navigateToPreviousRoute = function() {};
      this.goBackView = new GoBackView({
        router: this.router
      });
      this.goBackView.render();
    });

    afterEach(function() {
      this.router = null;
      this.goBackView = null;
    });

    describe('Go Back View Initialization', function() {

      it('is defined', function() {
        expect(this.goBackView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.goBackView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.goBackView.attributes.id).to.equal('go-back-view');
      });

    });

    describe('Go Back View DOM', function() {

      it('has close icon', function() {
        var closeIcon = this.goBackView.$el.find('i.fa-chevron-left');
        expect(closeIcon.length).to.be.equal(1);
      });

    });

    describe('Go Back View Events', function() {

      it('listens to close click', sinon.test(function() {
        var spy = sinon.spy(this.goBackView, 'close');
        this.goBackView.delegateEvents();
        // simulate user event
        this.goBackView.$el.find('i.fa-chevron-left').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    describe('Go Back View Methods', function() {

      describe('close Method', function() {

        xit('redirects user back to workouts', sinon.test(function() {
          var spy = sinon.spy();
          this.router.on({
            'workouts': spy
          });
          this.goBackView.$el.find('.close-add-workout-view-button').trigger('click');
          expect(spy.called).to.be.true;
        }));

      });

    });

  });
});