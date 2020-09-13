const express = require('express')
const app = express()
const ejs = require('ejs');
const port = 3000
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
  res.sendFile(path.join(__dirname + '/src/views/index.html'));
});

app.get('/reports', (req, res) => {
  fs.readdir(path.join(__dirname + '/snapshots'), function (err, files) {
    if (err) {  return console.log('Unable to scan directory: ' + err);} 
    res.render('index', {files:  files});
  });
});

app.get('/reports/:id', (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname + `/snapshots/${req.params.id}.html`));
}); 

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
})

async function logger () {  
  let filename =  "ALPHA_" + moment().format('DD-MM-YY-HH-MM-SS');
  console.log(filename);
  await exec(` lighthouse "${url}"  --chrome-flags="--headless" stdout --output=json --output=html --output-path="./snapshots/${filename}.html" -GA`);
}

let j = schedule.scheduleJob('0 0 * * *', function(){
  console.log("logging job...");
  logger()
})


