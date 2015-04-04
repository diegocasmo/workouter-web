/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the WorkoutsCollection object.
 */

/*global define, describe, it, afterEach, beforeEach*/
define([
  'collections/workouts_collection',
  'models/user_model'
],function(WorkoutsCollection, UserModel) {

  'use strict';

  beforeEach(function() {
    this.userModel = UserModel.getInstance();
    this.workoutsCollection = new WorkoutsCollection();
  });

  afterEach(function() {
    this.userModel = null;
    this.workoutsCollection = null;
  });

  describe('Workouts Collection', function() {

    describe('Collection Initialization', function() {
      it('is defined', function() {
        expect(this.workoutsCollection).to.be.ok;
      });

      it('has a model', function() {
        expect(this.workoutsCollection.model).to.exist;
      });
    });

  });

});