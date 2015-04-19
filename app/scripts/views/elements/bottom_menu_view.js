/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the add workout button.
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

  var BottomMenuView = Backbone.View.extend({

    template: JST['app/scripts/templates/elements/bottom_menu_view.hbs'],

    tagName: 'div',

    attributes: {
      id: 'bottom-menu-view'
    },

    events: {
      'click i.fa-plus': 'goToAddWorkout',
      'click i.fa-user': 'goToProfile',
      'click i.fa-home': 'goToWorkouts'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.bottomMenuView));
      // make sure current route isn't show on menu
      this.hideCurrentRoute();
      return this;
    },

    goToAddWorkout: function(event) {
      event.preventDefault();
      this.router.navigate('workout/add', { trigger: true });
    },

    goToProfile: function(event) {
      event.preventDefault();
      this.router.navigate('me', { trigger: true });
    },

    goToWorkouts: function(event) {
      event.preventDefault();
      this.router.navigate('workouts', { trigger: true });
    },

    /**
     * hides current route from menu
     */
    hideCurrentRoute: function() {
      var urlHash = window.location.hash;
      // clean hash
      urlHash = urlHash.replace('#', '');
      if(urlHash === 'workouts') {
        this.$el.find('i.fa-home').parent().hide();
      } else if (urlHash === 'me') {
        this.$el.find('i.fa-user').parent().hide();
      }
    }

  });

  return BottomMenuView;

});
