var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var assert = require('assert');

var config = require('./config/config.js');

var MongoClient = mongodb.MongoClient;

var app = express();
var router = express.Router();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

router.get('/', function (req, res) {
  res.status(400).send("use /api");
});

router.get('/api', function (req, res) {
  res.status(200).send("api version 0.0.1");
});

router.get('/relays', function (req, res) {
  MongoClient.connect(config.db, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db.close();
  });
  res.status(200).send("relays list");
});

router.post('/relay', function (req, res) {
  MongoClient.connect(config.db, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db.close();
  });
  res.status(200).send("log/update relay, needs name and ip");
});

router.get('/user/:user_id', function (req, res) {
  MongoClient.connect(config.db, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db.close();
  });
  res.status(200).send("get user data");
});

router.post('/user', function (req, res) {
  MongoClient.connect(config.db, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db.close();
  });
  res.status(200).send("sign/update user, if user_id: updates else signs");
});

app.use('/', router);
app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
