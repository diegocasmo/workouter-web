/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the BaseManager.
 */

/*global define, describe, it, afterEach, beforeEach, sinon*/
define([
  'managers/base_manager'
],function(BaseManager) {

  'use strict';

  describe('Base Manager', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.options = {
        router: this.router,
        eventTrigger: 'foo',
        managerClass: 'test'
      }
      this.baseManager = new BaseManager(this.options);
    });

    afterEach(function() {
      this.baseManager = null;
      this.router = null;
      this.options = null;
    });

    describe('Manager Initialization', function() {
      it('is defined', function() {
        expect(this.baseManager).to.be.ok;
      });

      it('listens to correct event', sinon.test(function() {
        var spy = sinon.spy(this.baseManager, 'buildChildViews');
        this.baseManager.router.on({
          'foo': spy()
        });
        this.baseManager.router.trigger('foo');
        expect(spy.called).to.be.true;
      }));

      it('should have a childViews property', function() {
        expect(this.baseManager.childViews).to.be.ok;
        expect(this.baseManager.childViews).to.be.instanceOf(Array);
      });
    });

    describe('Manager methods', function() {

      describe('buildChildViews Method', function() {
        it('must have a buildChildViews method', function() {
          expect(this.baseManager.buildChildViews).to.be.ok;
        });
      });

      describe('prepareManager Method', function() {
        it('must have a prepareManager method', function() {
          expect(this.baseManager.prepareManager).to.be.ok;
        });

        it('must scroll window to top', sinon.test(function() {
          var spy = sinon.spy(window, 'scrollTo');
          this.baseManager.prepareManager(this.options);
          expect(spy.called).to.be.true;
          expect(spy.calledWith(0,0)).to.be.true;
        }));

      });

      describe('destroyChildViews Method', function() {
        it('must have a destroyChildViews method', function() {
          expect(this.baseManager.destroyChildViews).to.be.ok;
        });

        it('should call remove on each child View', function() {
          // simulate adding a child view
          var dummyView = new Backbone.View(),
              spy = sinon.spy(dummyView, 'remove');
          this.baseManager.childViews.push(dummyView);
          this.baseManager.destroyChildViews();
          expect(spy.called).to.be.true;
        });

        it('should reset the childViews property', function() {
          // simulate adding a child view
          this.baseManager.childViews.push(new Backbone.View());
          this.baseManager.destroyChildViews();
          expect(this.baseManager.childViews.length).to.be.equal(0);
        });
      });

    });

  });

});
