/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the profile logout view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/profile/profile_logout_view',
  'lang/en_locale',
  'services/auth_service',
  'models/user_model'
],function(ProfileLogoutView, enLocale, AuthService, UserModel) {

  'use strict';

  describe('Profile Logout View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.userModel = UserModel.getInstance();
      this.profileLogoutView = new ProfileLogoutView({
        router: this.router
      });
      this.profileLogoutView.render();
    });

    afterEach(function() {
      this.userModel = null;
      this.router = null;
      this.profileLogoutView = null;
    });

    describe('Profile Logout View Initialization', function() {

      it('is defined', function() {
        expect(this.profileLogoutView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.profileLogoutView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.profileLogoutView.attributes.id).to.equal('profile-logout-view');
      });

    });

    describe('Profile Logout View DOM', function() {

      it('has logout text', function() {
        var logoutText = this.profileLogoutView.$el.find('p.logout');
        expect(logoutText.length).to.be.equal(1);
        expect(logoutText.text()).to.be.equal(enLocale.profile.profileLogoutView.logoutText.text);
      });

    });

    describe('Profile Logout View Events', function() {

      it('listens to logout text click and calls logUserOut', sinon.test(function() {
        var spy = sinon.spy(this.profileLogoutView, 'logUserOut');
        this.profileLogoutView.delegateEvents();
        // simulate user event
        this.profileLogoutView.$el.find('p.logout').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    describe('Profile Logout View Methods', function() {

      describe('logUserOut Method', function() {

        it('logs user out', sinon.test(function() {
          var spy = sinon.spy(AuthService, 'logUserOut');
          this.profileLogoutView.$el.find('.logout').trigger('click');
          expect(spy.called).to.be.true;
        }));

        xit('redirects to login', sinon.test(function() {
        }));

      });

    });

  });
});