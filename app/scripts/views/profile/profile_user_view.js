/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the profile user view.
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

  var ProfileUserView = Backbone.View.extend({

    template: JST['app/scripts/templates/profile/profile_user_view.hbs'],

    tagName: 'div',

    attributes: {
      class: 'profile-user-view'
    },

    initialize: function(options) {
      this.router = options.router;
      this.userModel = UserModel.getInstance();
    },

    render: function() {
      var jsonData = enLocale.profile.profileUserView;
      $.extend(jsonData, this.userModel.toJSON());
      this.$el.html(this.template(jsonData));
      return this;
    }

  });

  return ProfileUserView;

});
