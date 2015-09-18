// A view for the profile logout view.

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'lang/en_locale',
  'models/user_model',
  'services/auth_service',
  'helpers/flash_message_helper'
], function($, _, Backbone, Handlebars, enLocale, UserModel,
            AuthService, FlashMessage) {

  'use strict';

  var ProfileLogoutView = Backbone.View.extend({

    template: Handlebars.compile(
      '<button class="logout-button">{{ logoutText.text }}</button>'
      ),

    tagName: 'div',

    attributes: {
      class: 'profile-logout-view'
    },

    events: {
      'click .logout-button': 'logUserOut'
    },

    initialize: function(options) {
      this.router = options.router;
      this.userModel = UserModel.getInstance();
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
