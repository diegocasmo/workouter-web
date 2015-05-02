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

    $el: $('#flash-message'),

    timeInterval: 2500,

    /**
     * display a successful message
     */
    showSuccess: function(message) {
      this.$el.addClass('success');
      this.show(message);
    },

    /**
     * display an error message
     */
    showError: function(message) {
      this.$el.addClass('alert');
      this.show(message);
    },

    /**
     * display message passed to it on DOM
     * as flash message
     */
    show: function(message) {
      this.$el.stop();
      clearInterval(this.timeout);
      this.$el.children('.message-text').text(message);

      this.$el.css('height', 30);
      this.$el.animate({
        opacity: 1
      }, 'fast');

      var that = this;
      this.timeout = setTimeout(function() {
        that.$el.animate({
          opacity: 0
        }, 'fast', function() {
          that.$el.removeClass('success alert');
          that.$el.children('.message-text').text('');
          that.$el.css('height', 0);
        });
      }, this.timeInterval);
    }

  };

  return FlashMessage;

});