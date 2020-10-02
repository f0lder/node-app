"use strict";

var MongoClient = require('mongodb').MongoClient; //mydb is the new database we want to create


var url = "mongodb://localhost:27017/maindb"; //make client connect 

MongoClient.connect(url, function (err, client) {
  var db = client.db('maindb');
  if (err) throw err; //customers is a collection we  want to create                             

  db.createCollection("produsts", function (err, result) {
    if (err) throw err;
    console.log("database and Collection created!");
    client.close();
  });
});