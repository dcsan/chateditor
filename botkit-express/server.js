"use strict"

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var http           = require('http').Server(app);
var dotenv         = require('dotenv');

var reload = require('reload');


// configuration ===========================================

//load environment variables,
//either from .env files (development),
//heroku environment in production, etc...
dotenv.load();

// public folder for images, css,...
app.use(express.static(__dirname + '/public'))

//parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing url encoded

// view engine ejs
app.set('view engine', 'ejs');

let Stories = require('./app/models/Stories');
Stories.init();

// routes
require('./app/routes/routes')(app);
require('./app/routes/admin')(app);

//port for Heroku
app.set('port', (process.env.PORT));

//botkit (apres port)
require('./app/controllers/botkit')

// hot reloading
reload(http, app, 300)

//START ===================================================
http.listen(app.get('port'), function(){
  console.log('listening on port ' + app.get('port'));
});
