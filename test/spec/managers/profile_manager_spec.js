/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the LoginManager.
 */

/*global define, describe, it, afterEach, beforeEach, sinon*/
define([
  'managers/profile_manager'
],function(ProfileManager) {

  'use strict';

  describe('Profile Manager', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.profileManager = new ProfileManager({
        router: this.router,
        eventTrigger: 'foo'
      });
    });

    afterEach(function() {
      this.profileManager = null;
      this.router = null;
    });

    describe('Manager Initialization', function() {
      it('is defined', function() {
        expect(this.profileManager).to.be.ok;
      });

      it('listens to correct event', sinon.test(function() {
        var stub = sinon.stub(this.profileManager, 'buildChildViews').returns(false),
            spy = sinon.spy(stub);
        this.profileManager.router.on({
          'foo': spy()
        });
        this.profileManager.router.trigger('foo');
        expect(spy.called).to.be.true;
      }));
    });

    describe('Manager methods', function() {

      describe('buildChildViews Method', function() {

        it('must have a buildChildViews method', function() {
          expect(this.profileManager.buildChildViews).to.be.ok;
        });

        it('should initialize subviews correctly', function() {
          this.profileManager.childViews = [];
          this.profileManager.buildChildViews();
          expect(this.profileManager.goBackView).to.be.instanceOf(Backbone.View);
          expect(this.profileManager.profileUserView).to.be.instanceOf(Backbone.View);
          expect(this.profileManager.profileLogoutView).to.be.instanceOf(Backbone.View);
          expect(this.profileManager.bottomMenuView).to.be.instanceOf(Backbone.View);
        });

        it('should save childViews correctly', function() {
          this.profileManager.childViews = [];
          this.profileManager.buildChildViews();
          expect(this.profileManager.childViews.length).to.be.equal(4);
        });

        it('should call the render method', sinon.test(function() {
          var spy = sinon.spy(this.profileManager, 'render');
          this.profileManager.buildChildViews();
          expect(spy.called).to.be.true;
        }));
      });

      describe('destroyChildViews Method', function() {
        it('must have a destroyChildViews method', function() {
          expect(this.profileManager.destroyChildViews).to.be.ok;
        });
      });
    });

  });
});