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
    var relays = db.collection('relays');
    relays.find({}).toArray(function (error, result) {
      console.log(result);
      db.close();
      res.status(200).send(result);
    });
  });
});

router.post('/relay', function (req, res) {
  if (Object.keys(req.body).length) {
    MongoClient.connect(config.db, function(err, db) {
      assert.equal(null, err);
      var relays = db.collection('relays');
      req.body.time = Date.now();
      relays.update({name: req.body.name},req.body, {upsert: true});
      db.close();
    });
    res.status(200).send("correct, will post relay info to database");
  } else {
    res.status(400).send("wrong body or content-type header missing");
  }
});

router.post('/reset-relays', function (req, res) {
  MongoClient.connect(config.db, function(err, db) {
    assert.equal(null, err);
    var relays = db.collection('relays');
    relays.remove({});
    db.close();
    res.status(200).send("all relays have been removed from the database");
  });
});

router.get('/user/:user_id', function (req, res) {
  MongoClient.connect(config.db, function(err, db) {
    assert.equal(null, err);
    db.close();
  });
  res.status(200).send("get user data");
});

router.post('/user', function (req, res) {
  MongoClient.connect(config.db, function(err, db) {
    assert.equal(null, err);
    db.close();
  });
  res.status(200).send("sign/update user, if user_id: updates else signs");
});

app.use('/', router);
app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
