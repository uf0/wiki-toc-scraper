var request = require('request'),
    d3 = require('d3'),
    fs = require('fs');

var dataPath = 'data/',
    dataFile = 'ayahuasca.tsv';

var data = d3.tsvParse(fs.readFileSync(dataPath + dataFile, 'utf-8'));

var parseTime = d3.timeParse("%d %B %Y %H:%M");

var revisions = data.map(function(d){

  var url = d.URL;
  var oldid = url.split('=');
  oldid = oldid[oldid.length-1];

  var elm = {
    parsedDate:parseTime(d.date.trim() + ' ' + d.time.trim()),
    date:d.date.trim(),
    time:d.time,
    oldid:oldid
  };

  return elm;

})


console.log(revisions)
