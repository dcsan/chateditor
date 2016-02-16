"use strict"

let Stories = {};
var slack = require('../controllers/botkit');

Stories.init = function() {
    console.log('stories.init');

    let story = {cname: 'bob', code: 'some stuff here'};

    slack.controller.storage.stories.save(story, function(err, id) {
        if (err) {
            console.error('saving Story: ', story);
            slack.controller.trigger('error', [err]);
        }
    });
}

module.exports = Stories;
