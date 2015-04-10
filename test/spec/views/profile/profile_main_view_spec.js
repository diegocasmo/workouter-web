/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the profile main view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/profile/profile_main_view',
  'lang/en_locale',
  'services/auth_service',
  'models/user_model'
],function(ProfileMainView, enLocale, AuthService, UserModel) {

  'use strict';

  describe('Profile Main View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.userModel = UserModel.getInstance();
      this.profileMainView = new ProfileMainView({
        router: this.router
      });
      this.profileMainView.render();
    });

    afterEach(function() {
      this.userModel = null;
      this.router = null;
      this.profileMainView = null;
    });

    describe('Profile Main View Initialization', function() {

      it('is defined', function() {
        expect(this.profileMainView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.profileMainView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.profileMainView.attributes.id).to.equal('profile-main-view');
      });

    });

    describe('Profile Main View DOM', function() {

      it('has logout button', function() {
        var logoutElement = this.profileMainView.$el.find('.logout');
        expect(logoutElement.length).to.be.equal(1);
        expect(logoutElement.text()).to.be.equal(enLocale.profile.profileMainView.logoutButton.text);
      });

    });

    describe('Profile Main View Events', function() {

      it('listens to logout click and calls logUserOut', sinon.test(function() {
        var spy = sinon.spy(this.profileMainView, 'logUserOut');
        this.profileMainView.delegateEvents();
        // simulate user event
        this.profileMainView.$el.find('.logout').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    describe('Profile Main View Methods', function() {

      describe('logUserOut Method', function() {

        it('logs user out', sinon.test(function() {
          var spy = sinon.spy(AuthService, 'logUserOut');
          this.profileMainView.$el.find('.logout').trigger('click');
          expect(spy.called).to.be.true;
        }));

        xit('redirects to login', sinon.test(function() {
        }));

      });

    });

  });
});