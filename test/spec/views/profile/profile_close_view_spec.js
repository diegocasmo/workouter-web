/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the profile close view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/profile/profile_close_view',
  'lang/en_locale',
],function(ProfileCloseView, enLocale) {

  'use strict';

  describe('Profile Close View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.router.navigateToPreviousRoute = function() {};
      this.profileCloseView = new ProfileCloseView({
        router: this.router
      });
      this.profileCloseView.render();
    });

    afterEach(function() {
      this.router = null;
      this.profileCloseView = null;
    });

    describe('Profile Close View Initialization', function() {

      it('is defined', function() {
        expect(this.profileCloseView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.profileCloseView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.profileCloseView.attributes.class).to.equal('profile-close-view');
      });

    });

    describe('Profile Close View DOM', function() {

      it('has go back icon', function() {
        var goBackIcon = this.profileCloseView.$el.find('i.fa-chevron-left');
        expect(goBackIcon.length).to.be.equal(1);
      });

    });

    describe('Profile Close View Events', function() {

      it('listens to go back click', sinon.test(function() {
        var spy = sinon.spy(this.profileCloseView, 'navigateToWorkouts');
        this.profileCloseView.delegateEvents();
        // simulate user event
        this.profileCloseView.$el.find('i.fa-chevron-left').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    describe('Profile Close View Methods', function() {

      describe('navigateToWorkouts Method', function() {

        xit('redirects user back to workouts', sinon.test(function() {
        }));

      });

    });

  });
});