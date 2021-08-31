"use strict";

var express = require('express');

var router = express.Router();

var mongo = require('mongodb').MongoClient;

var assert = require("assert");

var _require = require('os'),
    type = _require.type;

var _require2 = require('mongodb'),
    ObjectId = _require2.ObjectId;

var url = "mongodb://localhost:27017/maindb";
/* GET home page. */

function generatePages(dbname, colname) {
  mongo.connect(url, function (err, db) {
    var dbo = db.db(dbname);
    dbo.collection(colname).find({}).toArray(function (err, result) {
      if (err) throw err; //  console.log(result);

      result.forEach(function (element) {
        router.get("/name=" + element.name, function (req, res, next) {
          res.render("prodid", {
            "name": element.name,
            "price": element.price,
            "title": "ITEM",
            "desc": element.desc
          });
        });
      });
      db.close();
    });
  });
}

generatePages("maindb", "products");
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/p', function (req, res, next) {
  mongo.connect(url, function (err, db) {
    var dbo = db.db("maindb");
    dbo.collection("products").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render("prod", {
        "res": result
      });
      db.close();
    });
  });
});
router.get('/get-data', function (req, res, next) {
  mongo.connect(url, function (err, db) {
    var dbo = db.db("maindb");
    dbo.collection("products").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render("index", {
        "res": result
      });
      db.close();
    });
  });
});
router.post('/insert', function (req, res, next) {
  var item = {
    name: req.body.name,
    price: parseInt(req.body.price),
    desc: req.body.desc
  };
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    dbo.collection("products").insertOne(item, function (err, res) {
      if (err) throw err;
      console.log("inserted!");
      db.close();
    });
  });
  res.redirect('/');
});
router.post("/update", function (req, res, next) {
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    var ID = req.body.id;
    var item = {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc
    };
    var query = {
      "_id": ObjectId(ID)
    };
    var newvalues = {
      $set: item
    };
    dbo.collection("products").updateOne(query, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  res.redirect("/");
});
router.post("/delete", function (req, res, next) {
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    var ID = req.body.id;
    var query = {
      "_id": ObjectId(ID)
    };
    dbo.collection("products").deleteOne(query, function (err, res) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
  res.redirect("/");
});
module.exports = router;