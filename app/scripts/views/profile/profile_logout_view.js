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
  'templates',
  'lang/en_locale',
  'services/auth_service',
  'models/user_model'
], function($, _, Backbone, JST, enLocale, AuthService, UserModel) {

  'use strict';

  var ProfileLogoutView = Backbone.View.extend({

    template: JST['app/scripts/templates/profile/profile_logout_view.hbs'],

    tagName: 'div',

    attributes: {
      id: 'profile-logout-view'
    },

    events: {
      'click p.logout': 'logUserOut'
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
      this.router.navigate('login', {
        trigger: true
      });
    }

  });

  return ProfileLogoutView;

});
