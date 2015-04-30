/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A helper object to show flash messages.
 */

/*global define*/
define([
  'jquery'
], function($) {

  'use strict';


  var FlashMessage = {

    $id: $('#flash-message'),

    timeInterval: 1500,

    /**
     * display message passed to it on DOM
     * as flash message
     */
    show: function(message) {
      this.$id.stop();
      clearInterval(this.timeout);
      this.$id.text(message);

      this.$id.animate({
        opacity: 1
      }, 'slow');

      var that = this;
      this.timeout = setTimeout(function() {
        that.$id.animate({
          opacity: 0
        }, function() {
          that.$id.text('');
        }, 'fast');
      }, this.timeInterval);
    }

  };

  return FlashMessage;

});