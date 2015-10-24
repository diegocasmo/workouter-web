// A wrapper to handle authentication with
// Firebase

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

    // Returns true if current user is logged in,
    // false otherwise
    isUserLoggedIn: function() {
      var authData = this.ref.getAuth();
      // If user is logged in, attempt to set it on model
      if(authData && this.userModel.setTwitterUser(authData)) {
        return true;
      }
      // User is logged out, or there was a problem
      // trying to sign in, reset and return false
      this.logUserOut();
      return false;
    },

    // Attempts to log user in
    attemptTologUserIn: function(cb) {
      this.ref.authWithOAuthPopup(
        FirebaseService.oAuthProvider,
        function(error, authData) {
          cb({
            error: error,
            authData: authData
          });
        }
      );
    },

    // Logs user out
    logUserOut: function() {
      this.ref.unauth();
      this.userModel.resetModel();
    }

  };

  return AuthService;

});
