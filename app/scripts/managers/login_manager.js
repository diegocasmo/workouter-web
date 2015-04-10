/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render login view
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager',
  'views/login/login_main_view'
], function($, _, Backbone, BaseManager, LoginMainView) {

  'use strict';

  var LoginManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      this.loginMainView = new LoginMainView(options);
      this.childViews.push(this.loginMainView);
      this.render();
    },

    render: function() {
      this.$el.append(this.loginMainView.render().el);
      return this;
    }

  });

  return LoginManager;

});