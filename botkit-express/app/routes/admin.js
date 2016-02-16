"use strict";

var Stories = require('../models/Stories');
var slack = require('../controllers/botkit');

module.exports = function(app) {

    // root
    app.get('/setup', function(req, res) {
        console.log("setup");
        res.end('setup'); // load view/root.html file
    });

    // editor
    app.get('/editor', function(req, res) {
        console.log("editor");
        let stories = [
            {cname: 'picnic'},
            {cname: 'other'},
        ];
        res.render('editor', {stories: stories});
    });

    app.get('/saveStory', function(req, res) {
        let story = 10;
        slack.controller.storage.stories.get(story.id, function(err, story) {
            if (err) { return; }
            console.log('story', story);
            res.end("story", story);
            // res.end('done');
        });
    });

};
