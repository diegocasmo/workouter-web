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
  'services/firebase_service'
], function($, _, Backbone, FirebaseService) {

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
        errors.push({ name: 'uid', message: 'Invalid uid.' });
      } else if (attrs.uid.indexOf(FirebaseService.oAuthProvider) === -1) {
        errors.push({ name: 'uid', message: 'Invalid uid provider.' });
      }

      if (!attrs.provider || attrs.provider !== FirebaseService.oAuthProvider) {
        errors.push({ name: 'provider', message: 'Invalid provider.' });
      }

      if (!attrs.token || typeof attrs.token !== 'string') {
        errors.push({ name: 'token', message: 'Invalid token.' });
      }

      if (!attrs.username || typeof attrs.username !== 'string') {
        errors.push({ name: 'username', message: 'Invalid username.' });
      }

      if (!attrs.displayName || typeof attrs.displayName !== 'string') {
        errors.push({ name: 'displayName', message: 'Invalid displayName.' });
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
     * create a user
     */
    createModel: function(attrs) {
      this.set(attrs);
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