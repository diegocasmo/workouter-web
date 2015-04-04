/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the UserModel object.
 */

/*global define, describe, it, afterEach, beforeEach*/
define([
  'models/user_model',
  'services/firebase_service'
],function(UserModel, FirebaseService) {

  'use strict';

  describe('User Model', function() {

    describe('Model Initialization', function() {
      beforeEach(function() {
        this.userModel = UserModel.getInstance();
      });

      afterEach(function() {
        this.userModel = null;
      });

      it('is defined', function() {
        expect(this.userModel).to.be.ok;
      });

      it('has correct defualt values', function() {
        expect(this.userModel.get('uid')).to.be.equal('');
        expect(this.userModel.get('provider')).to.be.equal(FirebaseService.oAuthProvider);
        expect(this.userModel.get('token')).to.be.equal('');
        expect(this.userModel.get('username')).to.be.equal('');
        expect(this.userModel.get('displayName')).to.be.equal('');
      });
    });

    describe('Model Validation', function() {
      beforeEach(function() {
        // create user
        this.userModel = UserModel.getInstance();
        this.userModel.set({
          uid: FirebaseService.oAuthProvider + ':246134729',
          provider: FirebaseService.oAuthProvider,
          token: 'DRiGSnTPwAP6np0lzGMOsOHHpJoUvvq5yUgRNW9qhcU',
          username: 'username',
          displayName: 'Some Name'
        });
      });

      afterEach(function() {
        this.userModel = null;
      });

      it('should have valid uid', function() {
        expect(this.userModel.isValid()).to.be.equal(true);
        expect(this.userModel.get('uid')).to.contain(FirebaseService.oAuthProvider);

        this.userModel.set({ 'uid': '' });
        expect(this.userModel.isValid()).to.be.equal(false);

        this.userModel.set({ 'uid': 0 });
        expect(this.userModel.isValid()).to.be.equal(false);
      });

      it('should have valid provider', function() {
        expect(this.userModel.get('provider')).to.equal(FirebaseService.oAuthProvider);

        this.userModel.set({ 'provider': 'facebook' });
        expect(this.userModel.isValid()).to.be.equal(false);
      });

      it('should have valid token', function() {
        expect(this.userModel.isValid()).to.be.equal(true);

        this.userModel.set({ 'token': '' });
        expect(this.userModel.isValid()).to.be.equal(false);

        this.userModel.set({ 'token': 0 });
        expect(this.userModel.isValid()).to.be.equal(false);
      });

      it('should have username', function() {
        expect(this.userModel.isValid()).to.be.equal(true);

        this.userModel.set({ 'username': '' });
        expect(this.userModel.isValid()).to.be.equal(false);

        this.userModel.set({ 'username': 0 });
        expect(this.userModel.isValid()).to.be.equal(false);
      });

      it('should have displayName', function() {
        expect(this.userModel.isValid()).to.be.equal(true);

        this.userModel.set({ 'displayName': '' });
        expect(this.userModel.isValid()).to.be.equal(false);

        this.userModel.set({ 'displayName': 0 });
        expect(this.userModel.isValid()).to.be.equal(false);
      });
    });

    describe('Model Functions', function() {
      it('returns correct unique identifier', function() {
        var uid = this.userModel.getUniqueIdentifier();
        expect(uid).to.be.equal(this.userModel.get('uid'));
      });
    });
  });

});