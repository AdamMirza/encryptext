const express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var dbName = "EncrytText";
var dbpassword = "ouwnhEPf2Vf2VfMgfQG";
const router = express.Router();

var url =
  "mongodb://get-secured:ouwnhEPf2VfMgfQG@cluster0-shard-00-00-bwprg.mongodb.net:27017,cluster0-shard-00-01-bwprg.mongodb.net:27017,cluster0-shard-00-02-bwprg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
//mongoose.connect('mongodb://username:password@host:port/database')
router.get("/api", function(req, res) {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      res.send("Error connecting " + err);
      return;
    }
    res.send("connected successfully to database");
  });
});

// Connect to the db

module.exports = router;
