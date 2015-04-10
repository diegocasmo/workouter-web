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
  'views/profile/profile_main_view'
], function($, _, Backbone, BaseManager, ProfileMainView) {

  'use strict';

  var ProfileManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      this.profileMainView = new ProfileMainView(options);
      this.childViews.push(this.profileMainView);
      this.render();
    },

    render: function() {
      this.$el.append(this.profileMainView.render().el);
      return this;
    }

  });

  return ProfileManager;

});