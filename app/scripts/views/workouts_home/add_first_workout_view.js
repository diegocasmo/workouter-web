// A view for the add first workout view.

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'lang/en_locale'
], function($, _, Backbone, enLocale) {

  'use strict';

  var AddFirstWorkoutView = Backbone.View.extend({

    template: _.template(
      '<h3 class="add-workout-msg"><%= addWorkoutMsg %></h3>'
    ),

    className: 'add-first-workout',

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.html(this.template(enLocale.workoutsHome.addFirstWorkoutView));
      return this;
    }

  });

  return AddFirstWorkoutView;

});
