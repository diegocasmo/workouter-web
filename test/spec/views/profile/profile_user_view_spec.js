/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the profile user view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/profile/profile_user_view',
  'lang/en_locale',
  'models/user_model'
],function(ProfileUserView, enLocale, UserModel) {

  'use strict';

  describe('Profile Logout View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.userModel = UserModel.getInstance();
      this.profileUserView = new ProfileUserView({
        router: this.router
      });
      this.profileUserView.render();
    });

    afterEach(function() {
      this.userModel = null;
      this.router = null;
      this.profileUserView = null;
    });

    describe('Profile Logout View Initialization', function() {

      it('is defined', function() {
        expect(this.profileUserView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.profileUserView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.profileUserView.attributes.class).to.equal('profile-user-view');
      });

    });

    describe('Profile Logout View DOM', function() {

      xit('has logout text', function() {
        var logoutText = this.profileUserView.$el.find('p.logout');
        expect(logoutText.length).to.be.equal(1);
        expect(logoutText.text()).to.be.equal(enLocale.profile.profileUserView.logoutText.text);
      });

    });

  });
});