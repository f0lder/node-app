var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require("assert");
const { type } = require('os');
var url = "mongodb://localhost:27017/maindb";
/* GET home page. */

function generatePages(dbname, colname) {
    mongo.connect(url, function(err, db) {

        var dbo = db.db(dbname);
        dbo.collection(colname).find({}).toArray(function(err, result) {
            if (err) throw err;
            //  console.log(result);
            result.forEach(element => {
                router.get("/id=" + element._id, function(req, res, next) {
                    res.render("prodid", { "name": element.name, "price": element.price });
                });
            });

            db.close();
        });
    });
}
generatePages("maindb", "products");


router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/p', function(req, res, next) {
    mongo.connect(url, function(err, db) {
        var dbo = db.db("maindb");
        dbo.collection("products").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.render("prod", { "res": result });
            db.close();
        });
    });
});

router.get('/get-data', function(req, res, next) {
    mongo.connect(url, function(err, db) {

        var dbo = db.db("maindb");
        dbo.collection("products").find({}).toArray(function(err, result) {
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
        var dbo = db.db("maindb");
        dbo.collection("products").insertOne(item, function(err, res) {
            if (err) throw err;
            console.log("inserted!");
            db.close();
        });
    });
    res.redirect('/');
});

router.post("/update", function(req, res, next) {

});
router.post("/delete", function(req, res, next) {

});
module.exports = router;