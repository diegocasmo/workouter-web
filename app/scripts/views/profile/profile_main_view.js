/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the main profile view.
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

  var ProfileMainView = Backbone.View.extend({

    template: JST['app/scripts/templates/profile/profile_main_view_template.hbs'],

    tagName: 'div',

    attributes: {
      id: 'profile-main-view'
    },

    events: {
      'click .logout': 'logUserOut'
    },

    initialize: function(options) {
      this.router = options.router;
      this.userModel = UserModel.getInstance();
    },

    render: function() {
      this.$el.html(this.template(enLocale.profile.profileMainView));
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

  return ProfileMainView;

});
