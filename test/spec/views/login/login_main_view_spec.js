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
      this.loginMainView = new LoginMainView();
    });

    afterEach(function() {
      this.loginMainView = null;
    });

    describe('Login Main View Initialization', function() {

      it('is defined', function() {
        exepect(this.loginMainView).to.be.ok;
      });

    });

  });
});