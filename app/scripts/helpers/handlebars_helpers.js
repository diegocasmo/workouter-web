// Handlebars helpers

define([
  'handlebars',
  'lang/en_locale'
], function(Handlebars, enLocale) {

  'use strict';

  Handlebars.registerHelper('beautify_date', function(options) {
    var timeAgo = new Date(parseInt(options.fn(this))),
        days = enLocale.daysNames[0],
        months = enLocale.monthsNames[0];

    var dayNumber = timeAgo.getUTCDate(),
        dayName = days[ timeAgo.getDay() ],
        monthName = months[ timeAgo.getMonth() ];

    return dayName + ', '  + dayNumber + ' ' + monthName;
  });

});
