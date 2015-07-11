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
      var authData = this.ref.getAuth();
      // if user is logged in, attempt to set it on model
      if(authData && this.userModel.setTwitterUser(authData)) {
        return true;
      }
      // user is logged out, or there was a problem
      // trying to sign in, reset and return false
      this.logUserOut();
      return false;
    },

    /**
     * attempt to log user in
     */
    attemptTologUserIn: function(callback) {
      this.ref.authWithOAuthPopup(
        FirebaseService.oAuthProvider,
        function(error, authData) {
          callback({
            error: error,
            authData: authData
          });
        }
      );
    },

    /**
     * log user out
     */
    logUserOut: function() {
      this.ref.unauth();
      this.userModel.resetModel();
    }

  };

  return AuthService;

});