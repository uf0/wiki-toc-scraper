var request = require('request'),
    d3 = require('d3'),
    async = require('async'),
    fs = require('fs');

var dataPath = 'data/',
    dataFile = 'ayahuasca_recover.tsv';

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
    pageTitle = 'Ayahuasca',
    outputFolder = 'data/ayahuascaToc/',
    baseUrl = 'https://'+ pageLang +'.wikipedia.org/w/api.php';

async.eachSeries(
  revisions,
  function(revision,callback){
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
        callback();
      }else {
        fs.writeFileSync(outputFolder + revision.oldid + '.json', body)
        console.log("saved revision " + revision.oldid + " of page " + pageTitle)
        callback();
      }

    })
  },
  function(err){
    if(err){
      console.log('A toc revision failed')
    }else{
      console.log('All toc revisions scraped')
    }
  }
);
