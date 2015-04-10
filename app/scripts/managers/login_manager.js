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

    /**
     * build child views for this manager
     */
    buildChildViews: function(options) {
      this.loginMainView = new LoginMainView(options);
      this.childViews.push(this.loginMainView);
    }

  });

  return LoginManager;
});