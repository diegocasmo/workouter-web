// A view for the profile logout view.

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'lang/en_locale',
  'services/auth_service',
  'helpers/flash_message_helper'
], function($, _, Backbone, enLocale, AuthService, FlashMessage) {

  'use strict';

  var ProfileLogoutView = Backbone.View.extend({

    template: _.template(
      '<button class="logout-button"><%= logoutText %></button>'
    ),

    className: 'profile-logout-view',

    events: {
      'click .logout-button': 'logUserOut'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.profile.profileLogoutView));
      return this;
    },

    logUserOut: function(event) {
      event.preventDefault();
      AuthService.logUserOut();
      FlashMessage.showSuccess(enLocale.flashMessage.logoutSuccess);
      this.router.navigate('login', { trigger: true });
    }

  });

  return ProfileLogoutView;

});
