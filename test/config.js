/*global require*/
require.config({
  baseUrl: '../app/scripts',
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    handlebars: '../bower_components/handlebars/handlebars.min',
    localstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
    firebase: '../bower_components/firebase/firebase',
    backbonefire: '../bower_components/backbonefire/dist/backbonefire',
    mocha: '../bower_components/mocha/mocha',
    chai: '../bower_components/chai/chai',
    sinon: '../bower_components/sinonjs/sinon',
    templates: '../../.tmp/scripts/templates',
    routefilter: '../bower_components/routefilter/dist/backbone.routefilter.min'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    localstorage: {
      deps: ['backbone']
    },
    backbonefire: {
      deps: ['firebase', 'backbone']
    },
    mocha: {
      exports: 'mocha'
    },
    chai: {
      exports: 'chai'
    }
  }
});

/*global mocha*/
require([
  'mocha',
  'chai',
  'sinon'
], function(mocha, chai, sinon) {
  // set up
  expect = chai.expect;
  assert = chai.assert;
  mocha.setup('bdd');

  // specs to be tested
  var specs = [];

  // collections
  specs.push('../../test/spec/collections/workouts_collection_spec');
  specs.push('../../test/spec/collections/exercises_collection_spec');

  // models
  specs.push('../../test/spec/models/user_model_spec');
  specs.push('../../test/spec/models/workout_model_spec');
  specs.push('../../test/spec/models/exercise_model_spec');

  // routers
  specs.push('../../test/spec/routers/app_router_spec');

  // managers
  specs.push('../../test/spec/managers/base_manager_spec');
  specs.push('../../test/spec/managers/login_manager_spec');
  specs.push('../../test/spec/managers/profile_manager_spec');
  specs.push('../../test/spec/managers/add_workout_manager_spec');

  // views
  specs.push('../../test/spec/views/login/login_main_view_spec');
  specs.push('../../test/spec/views/profile/profile_main_view_spec');

  require(specs, function() {
    mocha.run();
  });

});