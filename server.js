const express = require('express')
const app = express()
const ejs = require('ejs');
const port = 5000
const moment = require('moment');
const schedule = require('node-schedule');
const exec = require('await-exec')
const lighthouse = require('lighthouse');
const url = "https://alphaclothing.co";
const rule = " */1 * * * *";
const path = require('path');
const fs = require('fs');


app.set('view engine', 'ejs')
app.use(express.static('src'));
app.use(express.static('snapshots'));

app.get('/', (req, res) => {
  let latest = JSON.parse(fs.readFileSync(path.join(__dirname + '/latest-run/artifacts.json')));
  let files = fs.readdirSync(path.join(__dirname + '/snapshots'));
  let lastReport;
  
  if (files && files.length) {
     lastReport =  JSON.parse(fs.readFileSync(path.join(__dirname + "/snapshots/" + files[1] )));
  }

  res.render('index', {data: {
    files: files,
    lastReport: lastReport,
    latestDate: moment(latest).format("MM/DD/YYYY")
  }});

});

app.get('/latest-report', (req, res) => {
  // code here
});

app.get('/reports', (req, res) => {
  fs.readdir(path.join(__dirname + '/snapshots'), function (err, files) {
    if (err) {  return console.log('Unable to scan directory: ' + err);} 
    res.render('index', {files:  files});
  });
});

app.get('/generate', (req, res) => {
  logger();
  res.redirect('/');
})

app.get('/reports/:id', (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname + `/snapshots/${req.params.id}.json`));
}); 

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
})

async function logger () {  
  let filename =  "ALPHA_" + moment().format('MM-DD-YYYY-H-MM');
  console.log(filename);
  exec(`node test.js`);
}

let j = schedule.scheduleJob('0 0 * * *', function(){
  console.log("logging job...");
  logger()
})

logger();