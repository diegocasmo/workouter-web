/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for flash messages helper
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'jquery',
  'helpers/flash_message_helper'
],function($, FlashMessage) {

  'use strict';

  describe('Flash Message Helper', function() {

    describe('Flash Message Helper Initialization', function() {

      it('is defined', function() {
        expect(FlashMessage).to.be.ok;
      });

      it('has DOM id', function() {
        expect(FlashMessage.$id).to.be.ok;
      });

      it('has correct timeInterval', function() {
        expect(FlashMessage.timeInterval).to.be.equal(1500);
      });

    });

    describe('Flash Message Helper Methods', function() {

      describe('show', function() {

        it('is defined', function() {
          expect(FlashMessage.show).to.be.ok;
        });

        it('calls jQuery stop', sinon.test(function() {
          var spy = sinon.spy($.prototype, 'stop');
          FlashMessage.show('test');
          expect(spy.called).to.be.true;
        }));

        it('calls clearInterval', sinon.test(function() {
          var spy = sinon.spy(window, 'clearInterval');
          FlashMessage.show('test');
          expect(spy.called).to.be.true;
        }));

        it('calls setTimeout', sinon.test(function() {
          var spy = sinon.spy(window, 'setTimeout');
          FlashMessage.show('test');
          expect(spy.called).to.be.true;
        }));

      });

    });

  });
});