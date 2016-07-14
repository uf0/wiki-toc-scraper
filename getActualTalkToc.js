var request = require('request'),
    d3 = require('d3'),
    async = require('async'),
    fs = require('fs');

var baseUrl = 'https://en.wikipedia.org/w/api.php',
    drug = 'ayahuasca',
    sourceFile = 'pageListAyahuasca.tsv'
    parseTime = d3.timeParse("%H:%M, %d %B %Y (UTC)"),
    formatTime = d3.timeFormat("%Y-%m-%d %H:%M:%S"),
    output = [];

var pageList = d3.tsvParse(fs.readFileSync('data/talk/' + sourceFile, 'utf-8'));

async.eachSeries(
  pageList,
  function(page, callback){
    var page = page.page;
    var archive = page.split('/');
    archive = archive.length > 1 ? true:false;

    request({
      url: baseUrl,
      qs: {
        action: 'parse',
        prop: 'sections',
        page: page,
        format: 'json'
      }
    },function(err, res, body) {
      if(err){
        console.log(err);
      }else {
        console.log("get TOC from " + page)
        var data = JSON.parse(body);
        var toc = data.parse.sections.filter(function(d){
          return d.toclevel == 1;
        })

        var tocLength = toc.length;
        var tocCount = 0;
        toc.forEach(function(d){
          request({
            url: baseUrl,
            qs: {
              action: 'parse',
              prop: 'links|wikitext',
              page: page,
              format: 'json',
              section: +d.index
            }
          },function(err, res, body) {
            if(err){
              console.log(err);
            }else {
              console.log("get section " + d.line + " from " + page)
              var title = d.line;
              var sectionData = JSON.parse(body);
              var text = sectionData.parse.wikitext['*'];
              var links = sectionData.parse.links;

              var re = /[0-9][0-9]:[0-9][0-9], \d+ \w+ [0-9][0-9][0-9][0-9]\s\(UTC\)/g;
              var dates = text.match(re);

              if(dates){
                dates = dates.map(function(date){
                  var d = parseTime(date);
                  return d;
                })
              }else {
                dates = [];
              }

              dates.sort(function(a,b){
                return d3.ascending(a,b)
              })

              links = links.filter(function(d){
                return d.ns == 2;
              });

              var userCount = links.length;
              var startDate = dates.length ? dates[0] : null;
              var startDateParsed = startDate ? formatTime(startDate): null;
              var endDate,
                  endDateParsed;

              if(dates){
                if(dates.length == 1){
                  endDate = startDate;
                }else{
                  endDate = dates[dates.length-1];
                }
                endDateParsed = formatTime(endDate);
              }else{
                endDate = null;
                endDateParsed = null;
              }



              var elm = {
                page: page,
                title: title,
                startDate: startDateParsed,
                endDate: endDateParsed,
                users: userCount,
                archive: archive
              }

              output.push(elm)
              tocCount++
              if(tocCount == tocLength){
                //output = d3.tsvFormat(output);
                //fs.writeFileSync('data/talk/' + drug + '.tsv',output);
                callback();
              }
            }

          })
        })

      }

    })


  },
  function(err){
    if(err){
      console.log(err);
    }else{
      output = d3.tsvFormat(output);
      fs.writeFileSync('data/talk/' + drug + '.tsv',output);
      console.log('finish')
    }
  }
)
