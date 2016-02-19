"use strict";

var Mongorito = require('mongorito');

var Model = Mongorito.Model;

var Story = Model.extend({
    collection: 'stories',
});

// Story.init = function() {
//     console.log('stories.init');
// };

let story = new Story({
    cname: 'picnic',
    code: 'some code goes here'
});

// yield story.save();

var all = yield Story.all();


// let Stories = {};
// var slack = require('../controllers/botkit');
//
// Stories.init = function() {
//     console.log('stories.init');
//
//     let story = {cname: 'bob', code: 'some stuff here'};
//
//     slack.controller.storage.stories.save(story, function(err, id) {
//         if (err) {
//             console.error('saving Story: ', story);
//             slack.controller.trigger('error', [err]);
//         }
//     });
// }



module.exports = Story;
