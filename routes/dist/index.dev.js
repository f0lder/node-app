"use strict";

var express = require('express');

var router = express.Router();

var mongo = require('mongodb').MongoClient;

var assert = require("assert");

var _require = require('os'),
    type = _require.type;

var url = "mongodb://localhost:27017/maindb";
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/get-data', function (req, res, next) {
  var resultArray = [];
  mongo.connect(url, function (err, db) {
    var dbo = db.db("maindb");
    dbo.collection("produsts").find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result[0]);
      res.render("index", {
        "results": result
      });
      db.close();
    });
  });
  console.log(resultArray); // res.render("index", { "results": resultArray });
});
router.post('/insert', function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    dbo.collection("produsts").insertOne(item, function (err, res) {
      if (err) throw err;
      console.log("inserted!");
      db.close();
    });
  });
  res.redirect('/');
});
router.post("/update", function (req, res, next) {});
router.post("/delete", function (req, res, next) {});
module.exports = router;