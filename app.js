var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
var mongoose = require('mongoose');

var config = require('./config/config.js');

mongoose.connect(config.db, function(err) {
  if (err) {
    throw err;
  }
});
var db = mongoose.connection;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use(expressJWT({ secret: config.secret}).unless({
  path: ['/api', '/api/user/signup', '/api/user/login', '/api/relay/flare']
}));

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
