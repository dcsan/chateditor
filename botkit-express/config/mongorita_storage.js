"use strict";

var db = require('monk');

/**
 * botkit-storage-mongo - MongoDB driver for Botkit
 *
 * @param  {Object} config Mongo config
 * @return {Object} query result
 */
module.exports = function(config) {

    // console.log('mongo config', config);

    if (!config || !config.mongoUri) {
        throw new Error('Need to provide mongo address.');
    }

    var Teams = db(config.mongoUri).get('teams'),
        Users = db(config.mongoUri).get('users'),
        Channels = db(config.mongoUri).get('channels');

    var unwrapFromList = function(cb) {
        return function(err, data) {
            if (err) { return cb(err); }
            cb(null, data);
        };
    };

    var storage = {

        // stories: {
        //     get: function(id, cb) {
        //         Stories.findOne({id: id}, unwrapFromList(cb));
        //     },
        //     findOne: function(query, cb) {
        //         console.log('stories.findOne', query);
        //         Stories.findOne(query, unwrapFromList(cb));
        //     },
        //     save: function(data, cb) {
        //         Stories.findAndModify({
        //             id: data.id
        //         }, data, {
        //             upsert: true,
        //             new: true
        //         }, cb);
        //     },
        //     all: function(cb) {
        //         Stories.find({}, cb);
        //     }
        // },

        teams: {
            get: function(id, cb) {
                Teams.findOne({id: id}, unwrapFromList(cb));
            },
            save: function(data, cb) {
                Teams.findAndModify({
                    id: data.id
                }, data, {
                    upsert: true,
                    new: true
                }, cb);
            },
            all: function(cb) {
                Teams.find({}, cb);
            }
        },
        users: {
            get: function(id, cb) {
                Users.findOne({id: id}, unwrapFromList(cb));
            },
            save: function(data, cb) {
                Users.findAndModify({
                    id: data.id
                }, data, {
                    upsert: true,
                    new: true
                }, cb);
            },
            all: function(cb) {
                Users.find({}, cb);
            }
        },
        channels: {
            get: function(id, cb) {
                Channels.findOne({id: id}, unwrapFromList(cb));
            },
            save: function(data, cb) {
                Channels.findAndModify({
                    id: data.id
                }, data, {
                    upsert: true,
                    new: true
                }, cb);
            },
            all: function(cb) {
                Channels.find({}, cb);
            }
        }
    };
    //
    return storage;
};
