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
  'views/login/twitter_login_view'
], function($, _, Backbone, BaseManager, TwitterLoginView) {

  'use strict';

  var LoginManager = BaseManager.extend({

    el: $('#app-wrapper'),

    buildChildViews: function(options) {
      this.twitterLoginView = new TwitterLoginView(options);
      this.childViews.push(this.twitterLoginView);
      this.render();
    },

    render: function() {
      this.$el.append(this.twitterLoginView.render().el);
      return this;
    }

  });

  return LoginManager;

});