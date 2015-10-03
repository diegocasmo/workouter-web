// A view for the profile user view.

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'lang/en_locale'
], function($, _, Backbone, enLocale) {

  'use strict';

  var ProfileUserView = Backbone.View.extend({

    template: _.template(
      '<ul class="user-profile-list">' +
        '<li class="user-profile-item">' +
          '<img class="user-profile-banner" src="<%= profileBanner %>" alt="<%= displayName %>">' +
        '</li>' +
        '<li class="user-profile-item">' +
          '<img class="user-profile-avatar" src="<%= avatar %>" alt="<%= displayName %>">' +
        '</li>' +
        '<li class="user-profile-item">' +
          '<h6 class="user-profile-display-name"><%= displayName %></h6>' +
        '</li>' +
        '<li class="user-profile-item">' +
          '<p class="user-profile-location"><%= userLocation %></p>' +
        '</li>' +
      '</ul>'
    ),

    className: 'profile-user-view',

    initialize: function(options) {
      this.userModel = options.userModel;
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
