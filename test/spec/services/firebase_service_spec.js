/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for firebase service
 */

/*global define, describe, it*/
define([
  'jquery',
  'services/firebase_service'
],function($, FirebaseService) {

  'use strict';

  describe('Firebase Service', function() {

    describe('Firebase Service Properties', function() {

      it('has correct url', function() {
        expect(FirebaseService.url).to.be.equal('https://workouter.firebaseio.com/');
      });

      it('has correct oAuthProvider', function() {
        expect(FirebaseService.oAuthProvider).to.be.equal('twitter');
      });

    });

  });
});