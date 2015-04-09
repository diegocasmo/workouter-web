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

    /**
     * build child views for this manager
     */
    buildChildViews: function() {},

    /**
     * save child views on array for later destroy
     */
    saveChildViews: function() {}

  });

  return LoginManager;
});