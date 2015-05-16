/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the bottom menu view.
 */

/*global define, describe, xdescribe, it, afterEach, beforeEach, sinon*/
define([
  'views/elements/bottom_menu_view'
],function(BottomMenuView) {

  'use strict';

  describe('Bottom Menu View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.bottomMenuView = new BottomMenuView({
        router: this.router
      });
      this.bottomMenuView.render();
    });

    afterEach(function() {
      this.router = null;
      this.bottomMenuView = null;
    });

    describe('Bottom Menu View Initialization', function() {

      it('is defined', function() {
        expect(this.bottomMenuView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.bottomMenuView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.bottomMenuView.attributes.id).to.equal('bottom-menu-view');
      });

    });

    describe('Bottom Menu View DOM', function() {

      it('has an add workout icon', function() {
        var goToAddWorkout = this.bottomMenuView.$el.find('i.fa-plus');
        expect(goToAddWorkout.length).to.be.equal(1);
      });

      it('has a go to profile icon', function() {
        var goToProfile = this.bottomMenuView.$el.find('i.fa-user');
        expect(goToProfile.length).to.be.equal(1);
      });

    });

    describe('Bottom Menu View Events', function() {

      it('listens to go add workout click', sinon.test(function() {
        var spy = sinon.spy(this.bottomMenuView, 'goToAddWorkout');
        this.bottomMenuView.delegateEvents();
        // simulate user event
        this.bottomMenuView.$el.find('i.fa-plus').trigger('click');
        expect(spy.called).to.be.true;
      }));

      it('listens to go to profile click', sinon.test(function() {
        var spy = sinon.spy(this.bottomMenuView, 'goToProfile');
        this.bottomMenuView.delegateEvents();
        // simulate user event
        this.bottomMenuView.$el.find('i.fa-user').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    xdescribe('Bottom Menu View Methods', function() {

      describe('goToAddWorkout Method', function() {

        it('redirects user to add workout', sinon.test(function() {
        }));

      });

      describe('goToProfile Method', function() {

        it('redirects user to profile', sinon.test(function() {
        }));

      });

    });

  });
});