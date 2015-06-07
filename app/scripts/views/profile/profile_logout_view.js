/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the profile logout view.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'lang/en_locale',
  'services/auth_service',
  'models/user_model',
  'helpers/flash_message_helper'
], function($, _, Backbone, Handlebars, enLocale, AuthService,
          UserModel, FlashMessage) {

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
      var message = enLocale.flashMessage.logoutSuccess;
      FlashMessage.showSuccess(message);
      this.router.navigate('login', {
        trigger: true
      });
    }

  });

  return ProfileLogoutView;

});
