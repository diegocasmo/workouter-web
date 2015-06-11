/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view to redirect the user back to workouts home.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'lang/en_locale'
], function($, _, Backbone, enLocale) {

  'use strict';

  var GoToWorkouts = Backbone.View.extend({

    template: _.template(
      '<i class="fa fa-times"></i>'
      ),

    tagName: 'div',

    attributes: {
      id: 'go-to-workouts-view'
    },

    events: {
      'click i.fa-times': 'goToWorkouts'
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.goToWorkoutsView));
      return this;
    },

    goToWorkouts: function(event) {
      event.preventDefault();
      this.router.navigate('workouts', { trigger: true });
    }

  });

  return GoToWorkouts;

});
