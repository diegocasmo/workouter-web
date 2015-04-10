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
      displayName: ''
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
      this.set({
        uid: attrs.uid,
        provider: attrs.provider,
        token: attrs.token,
        username: attrs.twitter.username,
        displayName: attrs.twitter.displayName
      });

      if(this.isValid()) {
        return true;
      }

      return false;
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