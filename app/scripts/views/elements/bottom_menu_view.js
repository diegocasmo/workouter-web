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
  'lang/en_locale'
], function($, _, Backbone, enLocale) {

  'use strict';

  var BottomMenuView = Backbone.View.extend({

    template: _.template(
      '<ul class="bottom-menu-items">' +
        '<li class="bottom-menu-item">' +
          '<i class="bottom-menu-icon fa fa-plus"></i>' +
        '</li>' +
        '<li class="bottom-menu-logo">' +
        '</li>' +
        '<li class="bottom-menu-item">' +
          '<i class="bottom-menu-icon fa fa-user"></i>' +
        '</li>' +
      '</ul>'
    ),

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
    }

  });

  return BottomMenuView;

});
