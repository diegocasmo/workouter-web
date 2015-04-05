/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: View manager to render login view
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'managers/base_manager'
], function($, _, Backbone, BaseManager) {

  'use strict';

  var LoginManager = BaseManager.extend({

    render: function() {
      console.log('render');
    }

  });

  return LoginManager;
});