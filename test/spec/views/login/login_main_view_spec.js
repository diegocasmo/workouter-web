/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the login main view.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'views/login/login_main_view',
  'lang/en_locale',
  'services/auth_service'
],function(LoginMainView, enLocale, AuthService) {

  'use strict';

  describe('Login Main View', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.loginMainView = new LoginMainView({
        router: this.router
      });
      this.loginMainView.render();
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

      it('has correct id', function() {
        expect(this.loginMainView.attributes.id).to.equal('login-main-view');
      })

    });

    describe('Login Main View DOM', function() {

      it('has twitter login button', function() {
        var twitterElement = this.loginMainView.$el.find('.twitter-login');
        expect(twitterElement.length).to.be.equal(1);
        expect(twitterElement.text()).to.be.equal(enLocale.login.loginMainView.twitterButton.text);
      });

    });

    describe('Login Main View Events', function() {

      it('listens to login with twitter button click', sinon.test(function() {
        var spy = sinon.spy(this.loginMainView, 'loginWithTwitter');
        this.loginMainView.delegateEvents();
        // simulate user event
        this.loginMainView.$el.find('.twitter-login').trigger('click');
        expect(spy.called).to.be.true;
      }));

    });

    describe('Login Main View Methods', function() {

      describe('loginWithTwitter Method', function() {

        it('calls attemptTologUserIn on auth service', sinon.test(function() {
          var spy = sinon.spy(AuthService, 'attemptTologUserIn');
          // simulate user event
          this.loginMainView.$el.find('.twitter-login').trigger('click');
          expect(spy.called).to.be.true;
          spy.restore();
        }));

        xit('triggers login:error on user attempt cancel', sinon.test(function() {
          // stub to simulate error on login
          sinon.stub(AuthService, 'attemptTologUserIn').returns(false);
          var spy = sinon.spy();
          this.loginMainView.on({
            'login:error': spy
          });
          //this.loginMainView.delegateEvents();
          // simulate user event
          this.loginMainView.$el.find('.twitter-login').trigger('click');
          expect(spy).to.have.been.calledOnce;
          //spy.restore();
          //AuthService.attemptTologUserIn.restore();
        }));

        xit('triggers login:success on user successful login', function() {

        });

      });

    });

  });
});