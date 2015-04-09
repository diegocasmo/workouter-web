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
        var spy = sinon.spy(this.loginManager, 'buildChildViews');
        this.loginManager.router.on({
          'foo': spy()
        });
        this.loginManager.router.trigger('foo');
        expect(spy.called).to.be.true;
      }));
    });

    describe('Manager methods', function() {
      it('must have a buildChildViews method', function() {
        expect(this.loginManager.buildChildViews).to.be.ok;
      });

      it('must have a destroy method', function() {
        expect(this.loginManager.destroy).to.be.ok;
      });

      it('must have a saveChildViews method', function() {
        expect(this.loginManager.saveChildViews).to.be.ok;
      });
    });

  });
});