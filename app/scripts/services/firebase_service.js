/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A wrapper to save Firebase information.
 */

/*global define*/
define([
  'firebase'
], function() {

  'use strict';

  var FirebaseService = {

    url: 'https://workouter.firebaseio.com/',

    oAuthProvider: 'twitter'

  };

  return FirebaseService;

});