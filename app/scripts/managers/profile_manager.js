// View manager to render profile view

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'views/elements/go_back_view',
  'views/profile/profile_user_view',
  'views/profile/profile_logout_view',
  'views/elements/bottom_menu_view'
], function($, _, Backbone, BaseManager, GoBackView,
            ProfileUserView, ProfileLogoutView,
            BottomMenuElement) {

  'use strict';

  var ProfileManager = BaseManager.extend({

    template: _.template(
      '<div id="go-back-view"></div>' +
      '<div id="profile-user-view"></div>' +
      '<div id="profile-logout-view"></div>' +
      '<div class="bottom-menu"></div>'
    ),

    initializeManager: function(options) {
      this.render();
      this.renderGoBackView(options);
      this.renderPofileUserView(options);
      this.renderProfileLogoutView(options);
      this.renderBottomMenuElement(options);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    // Renders go back view
    renderGoBackView: function(options) {
      var goBackView = new GoBackView(options);
      this.childViews.push(goBackView);
      this.$el.find('#go-back-view')
        .append(goBackView.render().el);
    },

    // Renders profile user view
    renderPofileUserView: function (options) {
      var profileUserView = new ProfileUserView(options);
      this.childViews.push(profileUserView);
      this.$el.find('#profile-user-view')
        .append(profileUserView.render().el);
    },

    // Renders profile logout view
    renderProfileLogoutView: function(options) {
      var profileLogoutView = new ProfileLogoutView(options);
      this.childViews.push(profileLogoutView);
      this.$el.find('#profile-logout-view')
        .append(profileLogoutView.render().el);
    },

    // Renders bottom menu element
    renderBottomMenuElement: function(options) {
      var bottomMenuElement = new BottomMenuElement(options);
      this.childViews.push(bottomMenuElement);
      this.$el.find('.bottom-menu')
        .append(bottomMenuElement.render().el);
    }

  });

  return ProfileManager;

});
