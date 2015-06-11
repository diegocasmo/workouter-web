/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A model for a user.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'services/firebase_service',
  'lang/en_locale'
], function($, _, Backbone, FirebaseService, enLocale) {

  'use strict';

  var UserModel = Backbone.Model.extend({

    defaults: {
      uid: '',
      provider: FirebaseService.oAuthProvider,
      token: '',
      username: '',
      displayName: '',
      avatar: 'http://placehold.it/100x100',
      userLocation: '',
      profileBanner: 'http://placehold.it/620x310'
    },

    validate: function (attrs) {
      var errors = [];

      if (!attrs.uid || typeof attrs.uid !== 'string') {
        errors.push({ name: 'uid', message: enLocale.userModel.uid.required });
      } else if (attrs.uid.indexOf(FirebaseService.oAuthProvider) === -1) {
        errors.push({ name: 'uid', message: enLocale.userModel.uid.validUidProvider });
      }

      if (!attrs.provider || attrs.provider !== FirebaseService.oAuthProvider) {
        errors.push({ name: 'provider', message: enLocale.userModel.provider.validProvider });
      }

      if (!attrs.token || typeof attrs.token !== 'string') {
        errors.push({ name: 'token', message: enLocale.userModel.token.validToken });
      }

      if (!attrs.username || typeof attrs.username !== 'string') {
        errors.push({ name: 'username', message: enLocale.userModel.username.required });
      }

      if (!attrs.displayName || typeof attrs.displayName !== 'string') {
        errors.push({ name: 'displayName', message: enLocale.userModel.displayName.required });
      }

      if (!attrs.avatar || typeof attrs.avatar !== 'string') {
        errors.push({ name: 'avatar', message: enLocale.userModel.avatar.required });
      }

      if (!attrs.userLocation || typeof attrs.userLocation !== 'string') {
        errors.push({ name: 'userLocation', message: enLocale.userModel.userLocation.required });
      }

      if (!attrs.profileBanner || typeof attrs.profileBanner !== 'string') {
        errors.push({ name: 'profileBanner', message: enLocale.userModel.profileBanner.required });
      }

      return errors.length > 0 ? errors : false;
    },

    /**
     * returns uid of model
     */
    getUniqueIdentifier: function() {
      return this.get('uid');
    },

    /**
     * reset the model back to its defaults
     */
    resetModel: function() {
      this.clear().set(this.defaults);
    },

    /**
     * creats an instance of twiter a user.
     * returns true if successful, false otherwise
     */
    setTwitterUser: function(attrs) {
      // make sure we get bigger avatar instead of
      // normal
      var avatar = attrs.twitter.cachedUserProfile.profile_image_url_https;
      avatar = avatar.replace('_normal', '_bigger');
      this.set({
        uid: attrs.uid,
        provider: attrs.provider,
        token: attrs.token,
        username: attrs.twitter.username,
        displayName: attrs.twitter.displayName,
        avatar: avatar,
        userLocation: attrs.twitter.cachedUserProfile.location,
        profileBanner: attrs.twitter.cachedUserProfile.profile_banner_url
      });
      return (this.isValid()) ? true : false;
    }

  }, {

    singleton: null,

    getInstance: function() {
      UserModel.singleton = UserModel.singleton || new UserModel();
      return UserModel.singleton;
    }

  });

  return UserModel;

});