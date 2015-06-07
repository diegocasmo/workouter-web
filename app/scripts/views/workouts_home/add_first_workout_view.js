/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the add first workout view.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'lang/en_locale'
], function($, _, Backbone, Handlebars, enLocale) {

  'use strict';

  var AddFirstWorkoutView = Backbone.View.extend({

    template: Handlebars.compile(
      '<h3 class="add-workout-msg">{{ addWorkoutMsg }}</h3>'
      ),

    tagName: 'div',

    attributes: {
      id: 'add-first-workout-view'
    },

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
