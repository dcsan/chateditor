'use strict';

let Stories = {};

var MongoClient = require('mongodb'),
    co = require('co'),
    debug = require('debug')('mongo-storage')
    ;

module.exports = Stories;

let MongoStorage = {};

// uses ES6 mongo driver

var connectDb = co.wrap(function* () {
  console.log('connecting to db');
  let db = yield MongoClient.connect('mongodb://localhost:27017/mongo-drivers');
  AppConfig.users = db.collection('users');
  AppConfig.db = db;
  console.log('connecting to db < DONE');
  return (db);
});


MongoStorage.init = co.wrap(function* (config) {
  if (!config || !config.mongoUri) {
      throw new Error('Need to provide mongo address.');
  }
  let db = MongoClient.connect('mongodb://localhost:27017/mongo-drivers');
  yield db;
});


		//
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
