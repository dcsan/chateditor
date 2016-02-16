"use strict";

let xml2js = require('xml2js')
let fs = require('fs');
let path = require('path');
let debug = require('debug')('parser');

let parser = new xml2js.Parser();


const twinePath = path.join(__dirname, '../Twine/Stories/');
const filePath = twinePath + 'flow.html';

let raw = fs.readFileSync(filePath);
let xml = raw.toString();

// malformed twine xml
xml = xml.replace(' hidden>', '>');

// let xml = "<root>Hello xml2js!</root>";

// debug('xml', xml);
// debug('parsing');

// console.log('xml', xml);

// let options = {
//     trim: true,
//     emptyTag: 'empty'
//     // ignoreAttrs: true
// }

const formatCode = function(text, topicName) {

    let lines = text.split('\n\n');
    let start = lines.shift();

    let header = `

// ${topicName}
> topic ${topicName} inherits ${topicName}_shared global_commands

    + start
    - ${start}

`;

    let body = lines.join('\n\n');
    body = body.replace(/\[\[(.*)\]\]/gim, 'goto: $1');
    body = body.replace(/---/gim, '    //---');
    body = body.split('\n').join('\n    ');

    // output += lines.join('\n // ---- ');
    let output = header + body + '\n\n< topic\n';

    debug('output', output);

    return output;
}


let options = {};

parser.parseString(xml, function(err, obj) {
    if (err) {
        console.error('parse error', err);
    } else {
        console.log('parse started');
    }

    // debug('tw:', obj);
    // debug('storydata', obj['tw-storydata']);
    // debug('passagedata', obj['tw-storydata']['tw-passagedata']);

    debug('obj', JSON.stringify(obj, null, 2));

    let data = obj['tw-storydata'];
    let nodes = data['tw-passagedata'];

    // let passages = obj['tw-storydata']['tw-passagedata']

    console.log('data', JSON.stringify(data, null, 2));

    let topics = nodes.map( node => {
        let raw = node._;
        let topicName = node.$.name;
        let code = formatCode(raw, topicName);
        return({
            topicName: topicName,
            text: node._,
            code: code
        });
    });

    let story = {
        cname: data['$'].name,
        topics: topics
    };

    // console.log(JSON.stringify(story, null, 2));
    // console.log(story);

    let fullCode = story.topics.map( topic => {
        return topic.code;
    })

    console.log('fullCode', fullCode.join(''));

})
