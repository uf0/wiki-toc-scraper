var request = require('request'),
    d3 = require('d3'),
    async = require('async'),
    fs = require('fs');

var dataPath = 'data/',
    dataFile = 'Psilocybin_mushroom.tsv';

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

var pageLang = 'en',
    pageTitle = 'Psilocybin_mushroom',
    outputFolder = 'data/Psilocybin_mushroomToc/',
    count = 0,
    revLength = revisions.length,
    baseUrl = 'https://'+ pageLang +'.wikipedia.org/w/api.php';

    //if toomany split the array
    // console.log(revisions.length);
    // revisions = revisions.slice(2000,revisions.length)
revisions.forEach(function(revision){

  setTimeout(function() {
    request({
      url: baseUrl,
      qs: {
        action: 'parse',
        prop: 'sections',
        page: pageTitle,
        format: 'json',
        oldid: revision.oldid
      }
    },function(err, res, body) {
      if(err){
        console.log(err);
        count++
      }else {
        fs.writeFileSync(outputFolder + revision.oldid + '.json', body)
        count++
        console.log(count + '/' + revLength + ", saved revision " + revision.oldid + " of page " + pageTitle)
      }
    })
  }, (d3.randomUniform(1, 10)() * 100))
  });
