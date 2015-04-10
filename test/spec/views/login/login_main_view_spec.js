/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the login main view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/login/login_main_view'
],function(LoginMainView) {

  'use strict';

  describe('Login Main View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.loginMainView = new LoginMainView({
        router: this.router
      });
    });

    afterEach(function() {
      this.router = null;
      this.loginMainView = null;
    });

    describe('Login Main View Initialization', function() {

      it('is defined', function() {
        expect(this.loginMainView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.loginMainView.router).to.be.instanceOf(Backbone.Router);
      });

    });

  });
});