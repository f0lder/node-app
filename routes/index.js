var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require("assert");
const { type } = require('os');
const { ObjectId } = require('mongodb');
var url =
  "mongodb+srv://admin:admin@cluster0.rtuxu.mongodb.net?retryWrites=true&w=majority";
/* GET home page. */

function generatePages(dbname, colname) {
    mongo.connect(url, function(err, db) {
        var dbo = db.db(dbname);
        dbo.collection(colname).find({}).toArray(function(err, result) {
            if (err) throw err;
            //  console.log(result);
            result.forEach(element => {
                router.get("/id=" + element._id, function(req, res, next) {
                    res.render("prodid", { "text": element.text, "author": element.author, "date": element.date, "guild": element.guild,"channel":element.channel });
                });
            });

            db.close();
        });
    });
}
generatePages("discord", "logs");


router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/p', function(req, res, next) {
    mongo.connect(url, function(err, db) {
        var dbo = db.db("discord");
        dbo.collection("logs").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.render("prod", { "res": result });
            db.close();
        });
    });
});

router.get('/get-data', function(req, res, next) {
    mongo.connect(url, function(err, db) {
        var dbo = db.db("discord");
        dbo.collection("logs").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.render("index", { "res": result });
            db.close();
        });
    });
});

router.post('/insert', function(req, res, next) {
    var item = {
        name: req.body.name,
        price: parseInt(req.body.price),
        desc: req.body.desc
    };
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("discord");
        dbo.collection("logs").insertOne(item, function(err, res) {
            if (err) throw err;
            console.log("inserted!");
            db.close();
        });
    });
    res.redirect('/');
});

router.post("/update", function(req, res, next) {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("discord");

        var ID = req.body.id;


        var item = {
            text: req.body.text,
            author: req.body.author,
            channel: req.body.channel,
            guild: req.body.guild,
            date: req.body.date
        }
        var query = { "_id": ObjectId(ID) };
        var newvalues = { $set: item };
        dbo.collection("logs").updateOne(query, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
    res.redirect("/");
});
router.post("/delete", function(req, res, next) {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("discord");

        var ID = req.body.id;
        var query = { "_id": ObjectId(ID) };
        dbo.collection("logs").deleteOne(query, function(err, res) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
    res.redirect("/");
});
module.exports = router;