var request = require('request'),
    d3 = require('d3'),
    async = require('async'),
    fs = require('fs');

//http://stats.grok.se/json/en/200801/ayahuasca

var range = d3.timeMonth.range(new Date(2008, 0, 1), new Date(2008, 5 , 1));

var formatTime = d3.timeFormat('%Y%m');

range.forEach(function(d){
  d = formatTime(d);
})
