var fs = require('fs'),
    d3 = require('d3');

var drug = 'psilocybin';
var path = 'data/' + drug + 'Toc/';

// start reading other stuff
  var dataPath = 'data/';

  var data = d3.tsvParse(fs.readFileSync(dataPath + drug + '.tsv', 'utf-8'));

  var parseTime = d3.timeParse("%d %B %Y %H:%M");
  var formatTime = d3.timeFormat("%Y-%m-%d %H:%M:%S");

  var revisions = data.map(function(d){

    var url = d.URL;
    var oldid = url.split('=');
    oldid = oldid[oldid.length-1];

    var elm = {
      parsedDate:formatTime(parseTime(d.date.trim() + ' ' + d.time.trim())),
      date:d.date.trim(),
      time:d.time,
      oldid:oldid
    };

    return elm;

  })
// end reading other stuff

//Ayahuasca
// var stopTitle = [
//   'International Research',
//   'International research',
//   'Research',
//   'Health risks associated with Ayahusca',
//   'Health considerations associated with Ayahusca',
//   'Warnings',
//   'Addiction treatment'
// ];

//MDMA
// var stopTitle = [
//   'Effects',
//   'Short-term neurochemical effects',
//   'Subjective effects',
//   'Other short-term effects',
//   'Acute toxic/dangerous effects',
//   'Addiction and Tolerance',
//   'Long-term adverse effects',
//   'Medical use and clinical studies',
//   'Safety and contraindications',
//   'Neurological effects',
//   'Systemic effects',
//   'Long-term effects',
//   'Safety',
//   'Neurological Effects',
//   'Other Effects',
//   'Long Term Effects',
//   'Medical use',
//   'Use in psychotherapy',
//   'Hyponatremia',
//   'Safety and contradications',
//   'Safety and contradindications',
//   'Systemic Effects',
//   'Safety and Contraindications',
//   'Health Risks',
//   'Health risks',
//   'Physical effects',
//   'Physical',
//   'Neurological',
//   'Psychological',
//   'Health Concerns And Facts',
//   'Health Concerns',
//   'Neurotoxicity',
//   'Health concerns',
//   'Neurological overview',
//   'Short-term effects',
//   'Effects of chronic use',
//   'Acute effects',
//   'Controversy surrounding research',
//   'Theraputic Uses',
//   'Therapeutic Uses',
//   'Therapeutic uses',
//   'Acute Non-Fatal effects',
//   'Acute health concerns',
//   'Effects on the brain and serotonin',
//   'Effects On Driving',
//   'Effects on Driving',
//   'Therapeutic use',
//   'Beneficial effects',
//   'Side effects',
//   'Rebound / withdrawal',
//   'Overdose',
//   'Chronic use',
//   'Harm assessment',
//   'Short-term health concerns',
//   'Long-term effects on serotonin and dopamine',
//   'Medical uses',
//   'Adverse effects',
//   'After-effects',
//   'Objective effects',
//   'Safer use',
//   'Positive Effects that Users Seek',
//   'Positive effects sought by users',
//   'Medical Use',
//   'Hormonal and in pregnancy',
//   'Safety and contradictions',
//   'Acute Neurochemical Effects',
//   'Acute toxic (dangerous) effects',
//   'Positive effects',
//   'Chronic use and addiction',
//   'Medical',
//   'Immediate effects',
//   'Recreational effects',
//   'Underground therapy',
//   'Dependence and withdrawal',
//   'Reinforcement disorders',
//   'Spiritual',
//   'Alternative medicine',
//   'Short-term',
//   'Intermediate-term',
//   'Long-term',
//   'In pregnancy',
//   'Recreational and spiritual',
//   'Unlicensed medical use',
//   'Pregnancy',
//   'During pregnancy',
//   'Physical Effects'
// ]

// cannabis_(drug)
// var stopTitle = [
// 'Religious and spiritual use',
// 'Medical use',
// 'Lethal dose',
// 'Health issues and the effects of cannabis',
// 'Long-term effects of human consumption',
// 'Tolerance, withdrawal and dreams',
// 'Long-term effects on the mind and brain',
// 'Long-term effects of smoking',
// 'Spiritual use',
// 'Medical Marijuana Resources',
// 'Cannabis addiction',
// 'Long-term physical effects of smoking',
// 'Long-term effects on social well-being',
// 'Medical Uses',
// 'Pregnancy',
// 'Intoxication due to cannabis',
// 'Mental effects of cannabis consumption',
// 'Immediate mental effects of cannabis consumption',
// 'Lung Cancer',
// 'Memory',
// 'Mental Illness',
// 'Lung cancer',
// 'Mental illness',
// 'Marijuana and Cancer',
// 'Cancer',
// 'Health issues and the Effects',
// 'Effects of cannabis',
// 'Positive',
// 'Neutral',
// 'Negative',
// 'Withdrawal Symptoms',
// 'Health Issues',
// 'Effects on mental health',
// 'Generally desirable effects',
// 'Situationally desirable effects',
// 'Generally undesirable effects',
// 'Therapeutic effects',
// 'Non-therapeutic effects',
// 'Religious use',
// 'Medicinal use',
// 'List of effects',
// 'List of therapeutic effects',
// 'Detrimental effects',
// 'Long-term effects',
// 'List of negative effects',
// 'Fatalities',
// 'What are the short-term effects of Marijuana use?',
// 'What are the long-term effects of Marijuana use?',
// 'Effects of Heavy Marijuana Use on Learning and Social Behavior',
// 'Effects on Pregnancy',
// 'Addictive Potential',
// 'Long-term negative effects',
// 'Long-term non-therapeutic effects',
// 'Habit forming',
// 'impaired adolescent brain development',
// 'Lower obesity rate',
// 'Correlation and effects on psychiatric disorders',
// 'Memory, learning, and intelligence',
// 'Impaired adolescent brain development',
// 'No human fatalities',
// 'Effects on adolescent brain development',
// 'Long-term effects and safety',
// 'Safety',
// 'Human fatalities',
// 'Safety of cannabis',
// 'Obesity',
// 'Adolescent brain development',
// 'Addictiveness',
// 'Marijuana Abuse',
// 'Negative effects of Long-Term abuse',
// 'Adverse effects',
// 'Overdose',
// 'Medical',
// 'Respiratory',
// 'Carcinogenic',
// 'Cardiovascular',
// 'Suicide',
// 'Chronic use',
// 'Spiritual',
// 'Higher-ratio CBD-to-THC, lower psychosis',
// 'Schizophrenia',
// 'Psychiatric',
// 'Health effects',
// 'Marijuana Overdose',
// 'Brain Damage',
// 'Health issues and the effects of pot',
// 'Medicalization',
// 'Effects and health issues',
// 'Acute',
// 'Chronic',
// 'Addiction',
// 'Effects On The Brain',
// 'Fertility',
// 'Long term memory loss',
// 'New Study Shows Absence of Long-Term Memory or Cognitive Impairment',
// '<b>Repl</b>igious a<i>xd</i> spiritual xuse',
// '<b>Reprtnl</b>igious a<i>xd</i> spiritual xuse',
// 'Psychiatric Effects',
// 'Religious andn spiritual use',
// 'Possible psychiatric benefits',
// 'Medical benefits'
// ]

//cannabis
// var stopTitle = [
// 'Largely mental',
// 'Largely physical',
// 'Lethal dose',
// 'Long-term effects of human consumption',
// 'Tolerance, withdrawal and dreams',
// 'Long-term effects on the mind and brain',
// 'Long-term effects of smoking',
// 'Medical use',
// 'Spiritual use',
// 'Religious uses',
// 'Religious use',
// 'Medical Cannabis',
// 'Medical uses',
// 'THC content',
// 'THC Content',
// 'Possibly positive or desirable',
// 'Possibly neutral',
// 'Possibly negative or undesirable',
// 'Tolerance and Withdrawal',
// 'Long-term effects',
// 'Neurotoxicity',
// 'Infertility effects of marijuana',
// 'Health Studies',
// 'Cannabis and Health',
// 'Other long-term effects of smoking',
// 'Tolerance and withdrawal',
// 'Side effects',
// 'Chronic effects of human consumption'
// ]

//DMT
// var stopTitle = [
// 'Side Effects',
// 'Effects',
// 'Side effects',
// 'Toxicity',
// 'Effects on a body',
// 'Complications',
// 'Mental',
// 'Negative effects'
// ]

//Ketamine
// var stopTitle =
// ['Medical use',
// 'Experimental Antidepressant Use',
// 'Treatment of addiction',
// 'Psychological effects',
// 'Danger',
// 'Side Effects',
// 'Side effects',
// 'Experimental antidepressant use',
// 'Treatment of reflex sympathetic dystrophy',
// 'Pharmacological model of schizophrenia',
// 'Long-term side effects',
// 'Postoperative pain',
// 'Abuse',
// 'Effects',
// 'Treatment of complex regional pain syndrome (reflex sympathetic dystrophy)',
// 'Neurological Effects',
// 'Urinary Tract Effects',
// 'Short Term',
// 'Long Term',
// 'Short term',
// 'Long term',
// 'Neurological effects',
// 'Urinary tract effects',
// 'Adverse effects',
// 'Complex regional pain syndrome',
// 'Hepato-toxicity in chronic pain management',
// 'Case report of hepato-toxicity in chronic pain management',
// 'Case reports of hepato-toxicity in chronic pain management',
// 'Medical Use',
// 'Medicinal use',
// 'Antidepressant use',
// 'Case reports of hepatotoxicity in chronic pain management',
// 'Fear of Harm',
// 'Epilepsy',
// 'Fear of harm',
// 'Central nervous system',
// 'Pain',
// 'Clinical Depression',
// 'Adverse Reactions',
// 'Side effects and adverse reactions',
// 'Veterinary medicine',
// 'Chronic pain syndrome',
// 'Depression',
// 'Effects in central nervous system',
// 'Effects in peripheral systems',
// 'Liver problems',
// 'Treatment of rabies',
// 'Antidepressant',
// 'Brain Fungus',
// 'Medical',
// 'Pain management',
// 'Treatment of Addiction']

//LSD
// var stopTitle = ['Effects',
// 'Psychological',
// 'Sensory/perception',
// 'Spiritual',
// 'Physical dangers',
// 'Flashbacks and HPPD',
// 'Psychosis',
// 'Flashbacks',
// 'Addictive potential',
// 'Effects of LSD',
// 'Psychiatric Use',
// 'Psychoses',
// 'Addictive potential and riks',
// 'Other risks',
// 'What LSD does to a person',
// 'Hazards and Risks of LSD use',
// 'Potential Risks of LSD use',
// 'Addiction potential',
// 'Potential risks of LSD use',
// 'Sensory/Perception',
// 'Physical Dangers',
// 'Addictive Potential',
// 'Psychiatric use',
// 'Psychodoses',
// 'LSD Adiccts',
// 'Pain Relief',
// 'Cluster Headache',
// 'Enhancement of Psychotherapy',
// 'Treatment of Alcoholism',
// 'Uses and Investigated Uses',
// 'Treatment of Cluster Headaches',
// 'Dangers',
// 'Uterine contractions',
// 'Enhancement of Creativity',
// 'Enhancement of Creativity and Aesthetic Appreciation',
// 'Creativity enhancement claims',
// 'Creativity and aesthetics',
// 'Creativity',
// 'Psychotherapy',
// 'Alcoholism',
// 'Pain',
// 'Cluster headaches',
// 'Various Atypical Psychotic Reactions',
// 'Addiction Potential',
// 'Possible Medical Uses',
// 'Possible medical uses',
// 'Sensory and perception',
// 'Adverse drug interactions',
// 'Panic and anxiety',
// 'Overdose',
// 'Possibly risks',
// 'Possible risks',
// 'Sensory',
// 'End-of-life Anxiety',
// 'Potential adverse effects',
// 'End-of-life anxiety',
// 'Mental disorders',
// 'Treatment of intoxication',
// 'Psychological (Mental)',
// 'Therapies',
// 'Psychedelic therapy',
// 'Alcoholism treatment',
// 'Pain management',
// 'Medical',
// 'Recreational and spiritual',
// 'Therapeutic use',
// 'Addiction and tolerance',
// 'Enhancing performance',
// 'Pregnancy',
// 'Long Term Effects']

//Psilocybin_mushroom
// var stopTitle = [
// 'Effects',
// 'Physical',
// 'Sensory',
// 'Emotional',
// 'Psychological',
// 'Danger',
// 'Medical usage investigations',
// 'Health dangers',
// 'Possible risks',
// 'Medicinal use',
// 'As medicine',
// 'Effects of Toxicity',
// 'Cardiovascular abnormalities',
// 'Spiritual & well being',
// 'Spiritual and well being',
// 'Spiritual and Well Being'
// ]

//Psilocybin
var stopTitle = [
'Medicine',
'Toxicity',
'Effects',
'Adverse effects',
'Psilocybin and Medicine',
'Possible benefits in healthy adults',
'Research on the effects of psilocybin consumption',
'Perceptual distortions',
'"Mystical" experiences',
'Cardiovascular abnormalities',
'Psychosis',
'Mystical experiences',
'State of Mind Influences',
'Psychiatric Adverse Effects',
'Possible Psychiatric Adverse Effects',
'Possible adverse psychiatric effects',
'Negative experience',
'Use as medicine',
'Use in medicine',
'Changes to personality',
'Physical effects',
'Toxicity and harm potential',
'Medical research',
'Psilocybin and medicine',
'Effects on metabolism',
'Spiritual',
'Psychiatric',
'Tolerance and dependence',
'Research and potential for use in medicine'
]

var files = fs.readdirSync(path);
var output = [];

files.forEach(function(file){

  if(file != '.DS_Store'){
    console.log('parsing ' + file)
    try{
      var data = JSON.parse(fs.readFileSync(path + file, 'utf-8'));
      var revid = data.parse.revid;
      var toc = data.parse.sections;
      if(toc.length){

        var titles = toc.map(function(d){
          return d.line
        })

        stopTitle.forEach(function(d){
          if(titles.indexOf(d)>-1){
            var tocElm = toc.filter(function(e){
              return e.line == d;
            })[0];
            var bytes = tocElm['index'] == toc.length ? null :(toc[+tocElm['index']].byteoffset- tocElm.byteoffset);

            var date = revisions.filter(function(e){
              return e.oldid == revid;
            })[0].parsedDate;

            var elm = {
              revid: revid,
              title: tocElm.line,
              toclevel: tocElm.toclevel,
              index: +tocElm['index'],
              indexInverse: (+tocElm['index']-(toc.length))*-1,
              bytes: bytes,
              date: date,
              titlesNumber: toc.length
            }
            output.push(elm);
          }
        });
        }
      }//end try
    catch(err){
      console.log(err);
    }
  }

});

output = d3.tsvFormat(output);
fs.writeFileSync('data/' + drug + '_flows.tsv', output);
console.log('Finished');
