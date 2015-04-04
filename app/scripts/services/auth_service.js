/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A wrapper to handle authentication with
 *              Firebase information.
 */

/*global define, Firebase*/
define([
  'models/user_model',
  'services/firebase_service',
  'firebase'
], function(UserModel, FirebaseService) {

  'use strict';

  var AuthService = {

    userModel: UserModel.getInstance(),

    ref: new Firebase(FirebaseService.url),

    /**
     * returns true if current user is logged in,
     * false otherwise
     */
    isUserLoggedIn: function() {
      return (this.ref.getAuth()) ? true : false;
    },

    /**
     * attempt to log in a user
     */
    attemptTologUserIn: function(callback) {
      this.ref.authWithOAuthPopup(FirebaseService.oAuthProvider, function(error, authData) {
        callback({
          error: error,
          authData: authData
        });
      });
    },

    /**
     * log out a user
     */
    logUserOut: function() {
      this.ref.unauth();
      this.userModel.resetModel();
    }

  };

  return AuthService;

});