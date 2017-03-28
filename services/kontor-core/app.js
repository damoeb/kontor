'use strict';

var SwaggerExpress = require('swagger-express-mw');
const express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./dist')); //serve swagger.json

// swagger

/*
how to use swagger in webpack
 */
var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 8080;
  app.listen(port);

  console.log('listening to http://127.0.0.1:' + port);
});

module.exports = app; // for testing
