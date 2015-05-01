/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the login app logo view.
 */

/*global define, describe, xdescribe, it, afterEach, beforeEach, sinon*/
define([
  'views/elements/login_app_logo_view'
],function(LoginAppLogoView) {

  'use strict';

  describe('Login App Logo View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.loginAppLogoView = new LoginAppLogoView({
        router: this.router
      });
      this.loginAppLogoView.render();
    });

    afterEach(function() {
      this.router = null;
      this.loginAppLogoView = null;
    });

    describe('Login App Logo View Initialization', function() {

      it('is defined', function() {
        expect(this.loginAppLogoView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.loginAppLogoView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct class', function() {
        expect(this.loginAppLogoView.attributes.class).to.equal('login-app-logo-view');
      });

    });

    describe('Login App Logo View DOM', function() {

      it('has an app logo image', function() {
        var logoImg = this.loginAppLogoView.$el.find('div.workouter-letter-logo');
        expect(logoImg.length).to.be.equal(1);
      });

    });

  });
});