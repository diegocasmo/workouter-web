/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the LoginManager.
 */

/*global define, describe, it, afterEach, beforeEach, sinon*/
define([
  'managers/login_manager'
],function(LoginMangaer) {

  'use strict';

  describe('Login Manager', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.loginManager = new LoginMangaer({
        router: this.router,
        eventTrigger: 'foo'
      });
    });

    afterEach(function() {
      this.loginManager = null;
      this.router = null;
    });

    describe('Manager Initialization', function() {
      it('is defined', function() {
        expect(this.loginManager).to.be.ok;
      });

      it('listens to correct event', sinon.test(function() {
        var stub = sinon.stub(this.loginManager, 'buildChildViews').returns(false),
            spy = sinon.spy(stub);
        this.loginManager.router.on({
          'foo': spy()
        });
        this.loginManager.router.trigger('foo');
        expect(spy.called).to.be.true;
      }));
    });

    describe('Manager methods', function() {

      describe('buildChildViews Method', function() {

        it('must have a buildChildViews method', function() {
          expect(this.loginManager.buildChildViews).to.be.ok;
        });

        it('should initialize a login main view', function() {
          this.loginManager.childViews = [];
          this.loginManager.buildChildViews();
          expect(this.loginManager.twitterLoginView).to.be.instanceOf(Backbone.View);
        });

        it('should save login main view on childViews property', function() {
          this.loginManager.childViews = [];
          this.loginManager.buildChildViews();
          expect(this.loginManager.childViews.length).to.be.equal(1);
        });

        it('should call the render method', sinon.test(function() {
          var spy = sinon.spy(this.loginManager, 'render');
          this.loginManager.buildChildViews();
          expect(spy.called).to.be.true;
        }));
      });

      describe('destroyChildViews Method', function() {
        it('must have a destroyChildViews method', function() {
          expect(this.loginManager.destroyChildViews).to.be.ok;
        });
      });
    });

  });
});