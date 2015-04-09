/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the AppRouter.
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'routers/app_router',
  'services/auth_service',
  'managers/base_manager',
  'routers/base_router'
],function(AppRouter, AuthService, BaseManager) {

  'use strict';

  describe('App Router', function() {

    beforeEach(function() {
      this.appRouter = new AppRouter();
    });

    afterEach(function() {
      this.appRouter = null;
    });

    describe('Router Initialization', function() {
      it('is defined', function() {
        expect(this.appRouter).to.be.ok;
      });

      it('has correct routes', function() {
        expect(this.appRouter.routes.login).to.be.ok;
        expect(this.appRouter.routes.workouts).to.be.ok;
        expect(this.appRouter.routes['workouts/:id/exercises']).to.be.ok;
        expect(this.appRouter.routes['workouts/:id/exercises/:id']).to.be.ok;
        expect(this.appRouter.routes.me).to.be.ok;
        expect(this.appRouter.routes['*actions']).to.be.ok;
      });

      it('has correct routes callbacks', function() {
        expect(this.appRouter.routes.login).to.be.equal('showLogin');
        expect(this.appRouter.routes.workouts).to.be.equal('showWorkouts');
        expect(this.appRouter.routes['workouts/:id/exercises']).to.be.equal('showWorkoutExercises');
        expect(this.appRouter.routes['workouts/:id/exercises/:id']).to.be.equal('showWorkoutExercise');
        expect(this.appRouter.routes.me).to.be.equal('showProfile');
        expect(this.appRouter.routes['*actions']).to.be.equal('showLogin');
      });
    });

    describe('Event Triggers', function() {
      it('triggers appropriate events', sinon.test(function() {
        var spy = sinon.spy();

        this.appRouter.on({
          'goTo:login': spy
        });

        this.appRouter.showLogin();
        expect(spy.called).to.be.true;
      }));
    });

    describe('Layout Management', function() {
      it('should be initially null', function() {
        expect(this.appRouter.activeLayout).to.be.equal(null);
      });

      it('should initialize Managers on route callback', sinon.test(function() {
        expect(this.appRouter.activeLayout).to.be.equal(null);
        // simulate login route callback
        this.appRouter.showLogin();
        expect(this.appRouter.activeLayout).to.be.instanceOf(BaseManager);
      }));
    });

    describe('Router Methods', function() {
      beforeEach(function() {
        this.baseManager = new BaseManager({
              router: this.appRouter,
              eventTrigger: 'foo'
            });
      });

      afterEach(function() {
        this.baseManager = null;
      });

      describe('Before Method', function() {
        it('should set activeLayout to null', function() {
          this.appRouter.activeLayout = this.baseManager;
          this.appRouter.before('dummy');
          expect(this.appRouter.activeLayout).to.be.equal(null);
        });

        it('should call activeLayout destroy and remove', function() {
          var spyDestroy = sinon.spy(this.baseManager, 'destroy'),
              spyRemove = sinon.spy(this.baseManager, 'remove');

          this.appRouter.activeLayout = this.baseManager;
          this.appRouter.before('dummy');
          expect(spyDestroy.called).to.be.true;
          expect(spyRemove.called).to.be.true;
        });

        xit('should redirect to login if user is unauthenticated', sinon.test(function() {
        }));

        xit('should not redirect to login if user is authenticated', sinon.test(function() {
        }));
      });
    });

  });
});