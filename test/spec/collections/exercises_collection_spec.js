/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Tests for the ExercisesCollection object.
 */

/*global define, describe, it, afterEach, beforeEach*/
define([
  'collections/exercises_collection'
],function(ExercisesCollection) {

  'use strict';

  beforeEach(function() {
    this.exercisesCollection = new ExercisesCollection();
  });

  afterEach(function() {
    this.exercisesCollection = null;
  });

  describe('Exercises Collection', function() {

    describe('Collection Initialization', function() {

      it('is defined', function() {
        expect(this.exercisesCollection).to.be.ok;
      });

      it('has local storage', function() {
        expect(this.exercisesCollection.localStorage).to.be.instanceOf(Backbone.LocalStorage);
      });

      it('has a model', function() {
        expect(this.exercisesCollection.model).to.exist;
      });

    });

    describe('Collection Methods', function() {

      it('should return collection length', function() {
        expect(this.exercisesCollection.getLength()).to.be.equal(this.exercisesCollection.length);
      });

    });

  });

});