var MongoClient = require('mongodb').MongoClient;
//mydb is the new database we want to create
var url = "mongodb://localhost:27017/maindb";
//make client connect
MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, client) {
  //  var db = client.db('maindb');
    var dbo = db.db('maindb');
    if (err) throw err;
    dbo.createCollection("products", function(err, result) {
        if (err) throw err;
        console.log("database and Collection created!");
        client.close();
    });
});
