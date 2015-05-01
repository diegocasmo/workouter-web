/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the twitter login view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/login/twitter_login_view',
  'lang/en_locale',
  'services/auth_service'
],function(TwitterLoginView, enLocale, AuthService) {

  'use strict';

  describe('Twitter Login View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.twitterLoginView = new TwitterLoginView({
        router: this.router
      });
      this.twitterLoginView.render();
    });

    afterEach(function() {
      this.router = null;
      this.twitterLoginView = null;
    });

    describe('Twitter Login View Initialization', function() {

      it('is defined', function() {
        expect(this.twitterLoginView).to.be.ok;
      });

      it('knows about the app router', function() {
        expect(this.twitterLoginView.router).to.be.instanceOf(Backbone.Router);
      });

      it('has correct id', function() {
        expect(this.twitterLoginView.attributes.class).to.equal('twitter-login-view');
      });

    });

    describe('Twitter Login View DOM', function() {

      it('has twitter login button', function() {
        var twitterLoginButton = this.twitterLoginView.$el.find('button#twitter-login');
        expect(twitterLoginButton.length).to.be.equal(1);
        expect(twitterLoginButton.text()).to.be.equal(enLocale.login.twitterLoginView.twitterLoginButton.text);
      });

    });

    describe('Twitter Login View Events', function() {

      it('listens to login with twitter button click', sinon.test(function() {
        var spy = sinon.spy(this.twitterLoginView, 'login');
        this.twitterLoginView.delegateEvents();
        // simulate user event
        this.twitterLoginView.$el.find('button#twitter-login').trigger('click');
        expect(spy.called).to.be.true;
      }));

      xit('listens to "login:error"', sinon.test(function() {
      }));

      xit('listens to "login:success"', sinon.test(function() {
      }));

    });

    describe('Twitter Login View Methods', function() {

      describe('login Method', function() {

        it('calls attemptTologUserIn on auth service', sinon.test(function() {
          var spy = sinon.spy(AuthService, 'attemptTologUserIn');
          this.twitterLoginView.login({ preventDefault: function() {} });
          expect(spy.called).to.be.true;
          spy.restore();
        }));

        xit('triggers "login:error" on user attempt cancel', sinon.test(function() {
        }));

        xit('triggers "login:success" on user successful login', sinon.test(function() {
        }));

      });

    });

  });
});