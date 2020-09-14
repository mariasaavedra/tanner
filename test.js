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

async function logger () {  
  let filename =  "ALPHA_" + moment().format('MM-DD-YYYY-H-MM');
  console.log(filename);
  await exec(` lighthouse "${url}" --chrome-flags="--headless --no-sandbox --disable-gpu" stdout --output=json --output=html --output-path="${path.resolve()}/snapshots/${filename}.html"`);
}

logger();
