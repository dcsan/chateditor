"use strict";

let xml2js = require('xml2js')
let fs = require('fs');
let path = require('path');

let debug = require('debug')('parser');


let parser = new xml2js.Parser();

let fp = path.join(__dirname, './Twine/Stories/hotel.html');
let raw = fs.readFileSync(fp);

let xml = raw.toString();

// debug('xml', xml);

parser.parseString(xml, (err, obj) => {
  // debug('tw:', obj);
  // debug('storydata', obj['tw-storydata']);
  // debug('passagedata', obj['tw-storydata']['tw-passagedata']);

  let passages = obj['tw-storydata']['tw-passagedata']

  console.log(JSON.stringify(obj['tw-storydata'], null, 2));

})
