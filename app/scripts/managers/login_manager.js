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
  'views/elements/login_app_logo_view',
  'views/login/twitter_login_view'
], function($, _, Backbone, BaseManager, LoginAppLogoView,
          TwitterLoginView) {

  'use strict';

  var LoginManager = BaseManager.extend({

    buildChildViews: function(options) {
      // initialize child views
      this.loginAppLogoView = new LoginAppLogoView(options);
      this.twitterLoginView = new TwitterLoginView(options);

      // save child views
      this.childViews.push(this.loginAppLogoView);
      this.childViews.push(this.twitterLoginView);

      this.render();
    },

    render: function() {
      this.$el.append(this.loginAppLogoView.render().el);
      this.$el.append(this.twitterLoginView.render().el);
      return this;
    }

  });

  return LoginManager;

});
