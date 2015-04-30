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

      it('has DOM el', function() {
        expect(FlashMessage.$el).to.be.ok;
      });

      it('has correct timeInterval', function() {
        expect(FlashMessage.timeInterval).to.be.equal(2700);
      });

    });

    describe('Flash Message Helper Methods', function() {

      beforeEach(function() {
        this.$fixture = $('#fixture');
        var flashMessageTemplate = '<div style="opacity: 0" id="flash-message" class="alert-box" data-alert>' +
                                  '<span class="message-text"></span>' +
                                  '</div>';

        this.$fixture.append(flashMessageTemplate);
      });

      afterEach(function() {
        this.$fixture.empty();
      });

      describe('showSuccess Method', function() {
        it('is defined', function() {
          expect(FlashMessage.showSuccess).to.be.ok;
        });

        it('adds a success class to $el', function() {
          var flashMessage = FlashMessage;
          // TODO: automatically detect fixture element instead of
          // re-assigning element on test
          FlashMessage.$el = $('#flash-message');
          flashMessage.showSuccess('test');
          expect(flashMessage.$el.hasClass('success')).to.be.true;
        });

        xit('calls FlashMessage show', sinon.test(function() {
          var flashMessage = FlashMessage;
          var spy = sinon.spy(flashMessage, 'show');
          FlashMessage.showSuccess('test');
          expect(spy.called).to.be.true;
        }));
      });

      describe('showError Method', function() {
        it('is defined', function() {
          expect(FlashMessage.showError).to.be.ok;
        });

        it('adds a alert class to $el', function() {
          var flashMessage = FlashMessage;
          // TODO: automatically detect fixture element instead of
          // re-assigning element on test
          FlashMessage.$el = $('#flash-message');
          flashMessage.showError('test');
          expect(flashMessage.$el.hasClass('alert')).to.be.true;
        });

        it('calls FlashMessage show', sinon.test(function() {
          var flashMessage = FlashMessage;
          var spy = sinon.spy(flashMessage, 'show');
          FlashMessage.showError('test');
          expect(spy.called).to.be.true;
        }));
      });

      describe('show Method', function() {

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