/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the LoginManager.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'managers/login_manager'
],function(LoginManager) {

  'use strict';

  describe('Login Manager', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.loginManager = new LoginManager({
        router: this.router
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

      xit('listens to correct event', sinon.test(function() {
        // test manager listens to login_manager:show event
        // from router correctly
      }))
    });

  });

});