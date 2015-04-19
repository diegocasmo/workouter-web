/**
 * Author: Diego Castillo
 * Company: Workouter
 * Description: Handlebars helpers
 */
define([
  'jquery',
  'underscore',
  'handlebars'
], function($, _, Handlebars) {

  'use strict';

  Handlebars.registerHelper('beautify_date', function(options) {
    var timeAgo = new Date(parseInt(options.fn(this)));
    if (Object.prototype.toString.call(timeAgo) === '[object Date]') {
      if (isNaN(timeAgo.getTime())) {
        return 'Not Valid';
      } else {
        var seconds = Math.floor((new Date() - timeAgo) / 1000),
          intervals = [
            Math.floor(seconds / 31536000),
            Math.floor(seconds / 2592000),
            Math.floor(seconds / 86400),
            Math.floor(seconds / 3600),
            Math.floor(seconds / 60)
          ],
          times = [
            'year',
            'month',
            'day',
            'hour',
            'minute'
          ];

        var key;
        for (key in intervals) {
          if (intervals[key] > 1)
            return intervals[key] + ' ' + times[key] + 's ago';
          else if (intervals[key] === 1)
            return intervals[key] + ' ' + times[key] + ' ago';
        }

        return Math.floor(seconds) + ' seconds ago';
      }
    } else {
      return 'Not Valid';
    }
  });

});
