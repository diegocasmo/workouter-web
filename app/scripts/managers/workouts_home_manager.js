/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render workouts view
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'views/elements/bottom_menu_view'
], function($, _, Backbone, BaseManager, BottomMenuView) {

  'use strict';

  var WorkoutsHomeManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      // initialize child views
      this.bottomMenuView = new BottomMenuView(options);

      // save child views
      this.childViews.push(this.bottomMenuView);

      this.render();
    },

    render: function() {
      this.$el.append(this.bottomMenuView.render().el);
      return this;
    }

  });

  return WorkoutsHomeManager;

});