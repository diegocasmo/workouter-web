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
  'views/elements/go_to_workouts',
  'views/profile/profile_user_view',
  'views/profile/profile_logout_view',
  'views/elements/bottom_menu_view'
], function($, _, Backbone, BaseManager, GoToWorkouts,
            ProfileUserView, ProfileLogoutView, BottomMenuElement) {

  'use strict';

  var ProfileManager = BaseManager.extend({

    buildChildViews: function(options) {
      // initialize child views
      this.goToWorkouts = new GoToWorkouts(options);
      this.profileUserView = new ProfileUserView(options);
      this.profileLogoutView = new ProfileLogoutView(options);
      this.bottomMenuView = new BottomMenuElement(options);

      // save child views
      this.childViews.push(this.goToWorkouts);
      this.childViews.push(this.profileUserView);
      this.childViews.push(this.profileLogoutView);
      this.childViews.push(this.bottomMenuView);

      this.render();
    },

    render: function() {
      this.$el.append(this.goToWorkouts.render().el);
      this.$el.append(this.profileUserView.render().el);
      this.$el.append(this.profileLogoutView.render().el);
      this.$el.append(this.bottomMenuView.render().el);
      return this;
    }

  });

  return ProfileManager;

});
