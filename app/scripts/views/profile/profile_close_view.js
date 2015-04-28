/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the profile go back view.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'lang/en_locale'
], function($, _, Backbone, JST, enLocale) {

  'use strict';

  var ProfileCloseView = Backbone.View.extend({

    template: JST['app/scripts/templates/profile/profile_close_view.hbs'],

    tagName: 'div',

    attributes: {
      class: 'profile-close-view'
    },

    events: {
      'click i.fa-chevron-left': 'navigateToWorkouts'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.profile.profileCloseView));
      return this;
    },

    navigateToWorkouts: function(event) {
      event.preventDefault();
      this.router.navigate('workouts', { trigger: true });
    }

  });

  return ProfileCloseView;

});
