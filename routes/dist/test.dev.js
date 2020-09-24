"use strict";

var express = require('express');

var router = express.Router();
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('test'); //return static webite ,no parameters
});
module.exports = router;