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
  'views/profile/profile_main_view',
  'views/elements/bottom_menu_view'
], function($, _, Backbone, BaseManager, ProfileMainView,
            BottomMenuElement) {

  'use strict';

  var ProfileManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      // initialize child views
      this.profileMainView = new ProfileMainView(options);
      this.bottomMenuView = new BottomMenuElement(options);

      // save child views
      this.childViews.push(this.profileMainView);
      this.childViews.push(this.bottomMenuView);

      this.render();
    },

    render: function() {
      this.$el.append(this.profileMainView.render().el);
      this.$el.append(this.bottomMenuView.render().el);
      return this;
    }

  });

  return ProfileManager;

});