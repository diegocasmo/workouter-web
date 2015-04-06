/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the BaseManager.
 */

/*global define, describe, it, afterEach, beforeEach, sinon*/
define([
  'managers/base_manager'
],function(BaseManager) {

  'use strict';

  describe('Base Manager', function() {

    beforeEach(function() {
      this.router = new Backbone.Router();
      this.baseManager = new BaseManager({
        router: this.router,
        eventTrigger: 'foo'
      });
    });

    afterEach(function() {
      this.baseManager = null;
      this.router = null;
    });

    describe('Manager Initialization', function() {
      it('is defined', function() {
        expect(this.baseManager).to.be.ok;
      });

      it('listens to correct event', sinon.test(function() {
        var spy = sinon.spy(this.baseManager, 'render');
        this.baseManager.router.on({
          'foo': this.baseManager.render()
        });
        this.baseManager.router.trigger('foo');
        expect(spy.called).to.be.true;
      }));
    });

    describe('Manager methods', function() {
      it('must have a destroy method', function() {
        expect(this.baseManager.destroy).to.be.ok;
      });
    });

  });

});