// Author: Diego Castillo
// Company: Workouter
// Description: A helper service to paginate a list

/*global define*/
define([
], function() {

  'use strict';

  function ListPaginator(list) {
    this.setList(list);
  }

  ListPaginator.prototype._totalPages = 0;

  ListPaginator.prototype._currentPage = 0;

  ListPaginator.prototype._perPage = 10;

  ListPaginator.prototype.setList = function(list) {
    this._list = list;
    this._setFirstPage();
    this._setTotalPages();
  };

  ListPaginator.prototype.getFirstPage = function() {
    this._setFirstPage();
    return this._getCurrentPage();
  };

  ListPaginator.prototype.getNextPage = function() {
    if (this._currentPage <= this._totalPages) {
      this._currentPage++;
      return this._getCurrentPage();
    }
  };

  ListPaginator.prototype._setFirstPage = function() {
    this._currentPage = 0;
  };

  ListPaginator.prototype._setTotalPages = function() {
    this._totalPages = Math.ceil(this._list.length / this._perPage);
  };

  ListPaginator.prototype._getCurrentPage = function() {
    return this._list.slice(
      this._currentPage * this._perPage,
      (this._currentPage + 1) * this._perPage
    );
  };

  return ListPaginator;

});
