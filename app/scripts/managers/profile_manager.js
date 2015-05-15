/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render profile view
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'views/profile/profile_close_view',
  'views/profile/profile_user_view',
  'views/profile/profile_logout_view',
  'views/elements/bottom_menu_view'
], function($, _, Backbone, BaseManager, ProfileCloseView,
            ProfileUserView, ProfileLogoutView, BottomMenuElement) {

  'use strict';

  var ProfileManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      // scroll to top
      window.scrollTo(0, 0);

      // initialize child views
      this.profileCloseView = new ProfileCloseView(options);
      this.profileUserView = new ProfileUserView(options);
      this.profileLogoutView = new ProfileLogoutView(options);
      this.bottomMenuView = new BottomMenuElement(options);

      // save child views
      this.childViews.push(this.profileCloseView);
      this.childViews.push(this.profileUserView);
      this.childViews.push(this.profileLogoutView);
      this.childViews.push(this.bottomMenuView);

      this.render();
    },

    render: function() {
      // this.$el.append(this.profileCloseView.render().el);
      this.$el.append(this.profileUserView.render().el);
      this.$el.append(this.profileLogoutView.render().el);
      this.$el.append(this.bottomMenuView.render().el);
      return this;
    }

  });

  return ProfileManager;

});