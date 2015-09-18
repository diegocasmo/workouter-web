// A helper object to show flash messages.

/*global define*/
define([
  'jquery',
  'underscore'
], function($, _) {

  'use strict';

  var FlashMessage = {

    $el: $('#flash-message'),

    timeInterval: 2500,

    // Display a successful message
    showSuccess: function(message) {
      this.$el.removeClass('success alert');
      this.$el.addClass('success');
      this.show(message);
    },

    // Display an error message
    showError: function(message) {
      this.$el.removeClass('success alert');
      this.$el.addClass('alert');
      this.show(message);
    },

    // Display message passed to it on DOM
    // as flash message
    show: function(message) {
      this.$el.on('click', _.bind(this.hide, this));
      this.$el.stop();
      clearTimeout(this.timeoutId);
      this.$el.children('.flash-message-text').text(message);

      this.$el.removeClass('display-none')
              .addClass('display-block')
              .animate({ opacity: 1 }, 'fast');

      var that = this;
      this.timeoutId = setTimeout(function() {
        that.$el.animate({
          opacity: 0
        }, 'fast', function() {
          that.hide();
        });
      }, this.timeInterval);
    },

    // Hides flash message
    hide: function() {
      clearTimeout(this.timeoutId);
      this.$el.off('click');
      this.$el.removeClass('display-block').addClass('display-none');
      this.$el.css('opacity', 0);
      this.$el.children('.flash-message-text').text('');
    }

  };

  return FlashMessage;

});
