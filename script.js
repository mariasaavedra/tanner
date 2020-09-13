const schedule = require('node-schedule');
const exec = require('await-exec')
const lighthouse = require('lighthouse');
const chrome = require('chrome-launcher');
const url = "https://alphaclothing.co";
const opts = {}

var rule = new schedule.RecurrenceRule();
rule.hour = 12;

async function logger () {
  await exec(`lighthouse "https://alphaclothing.co"  --chrome-flags="--headless"`)
}

let j = schedule.scheduleJob('0 0 * * *', function(){
  logger()
})


