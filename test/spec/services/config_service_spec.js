/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the config service
 */

/*global define, describe, it, xit, afterEach, beforeEach, sinon*/
define([
  'jquery',
  'services/config_service'
],function($, ConfigService) {

  'use strict';

  describe('ConfigService', function() {

    describe('ConfigService Properties', function() {

      it('has correct pagination number', function() {
        expect(ConfigService.pagination.perPage).to.be.equal(10);
      });

    });

  });
});