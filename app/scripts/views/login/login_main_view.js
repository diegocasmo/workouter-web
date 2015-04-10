/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: A view for the main login view.
 */

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
  ], function ($, _, Backbone, JST) {

    'use strict';

    var LoginMainView = Backbone.View.extend({

      template: JST['app/scripts/templates/login/login_main_view_template.hbs'],

      initialize: function (options) {
        this.router = options.router;
      }

    });

    return LoginMainView;
  });