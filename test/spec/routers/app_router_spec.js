/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the AppRouter.
 */

/*global define, describe, it, afterEach, beforeEach, sinon*/
define([
  'routers/app_router'
],function(AppRouter) {

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

  });

});