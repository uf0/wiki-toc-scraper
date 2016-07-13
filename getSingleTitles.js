var fs = require('fs'),
    d3 = require('d3');

var drug = 'Psilocybin_mushroom';
var path = 'data/' + drug + 'Toc/';

var files = fs.readdirSync(path);
var titlesList = [];

files.forEach(function(file){

  if(file != '.DS_Store'){
    console.log('parsing ' + file)
    try{
    var data = JSON.parse(fs.readFileSync(path + file, 'utf-8'));
    var toc = data.parse.sections;
    if(toc.length){
      toc.forEach(function(title){
        if(titlesList.indexOf(title.line)<0){
          titlesList.push(title.line)
        }
      })
    }
  }//end try
  catch(err){
    console.log(err);
  }
  }
})

var output = titlesList.map(function(d){
  return {title: d};
})

output = d3.tsvFormat(output);

fs.writeFileSync('data/' + drug + 'Title.tsv',output);
