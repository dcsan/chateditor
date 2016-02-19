'use strict';

var assert = require('assert');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/botkit_express_demo';
const config = {mongoUri: mongoUri};

var botkit_mongo_storage = require('./mongo')(config);
