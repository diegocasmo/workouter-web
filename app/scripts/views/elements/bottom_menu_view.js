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
      'click i.fa-user': 'goToProfile'
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
    }

  });

  return BottomMenuView;

});
