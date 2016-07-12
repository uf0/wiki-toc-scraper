var fs = require('fs'),
    d3 = require('d3');

var path = 'data/ayahuascaToc/';

var files = fs.readdirSync(path);

var titlesList = [];

files.forEach(function(file){

  var data = JSON.parse(fs.readFileSync(path + file, 'utf-8'));

  var toc = data.parse.sections;
  console.log('parsing ' + file)
  if(toc.length){
    toc.forEach(function(title){
      if(titlesList.indexOf(title.line)<0){
        titlesList.push(title.line)
      }
    })
  }

})

var output = titlesList.map(function(d){
  return {title: d};
})

output = d3.tsvFormat(output);

fs.writeFileSync('data/ayahuascaTitle.tsv',output);
