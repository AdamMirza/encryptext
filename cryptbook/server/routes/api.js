
const express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var dbName = "EncrytText";
var dbpassword = "ouwnhEPf2Vf2VfMgfQG";
const router = express.Router();
const keyGen = require('../../modules/keyGen')
var bodyParser = require('body-parser')

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

router.get('/api/generateKey/:username/:email',async function(req, res) {
  let options = {
    'username':req.params.username,
    'email':req.params.email
  }
  let key = await keyGen.newKeyPair(options);
  privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
  pubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
  let data = {
    'public_key': pubkey,
    'private_key':privkey
  }
  res.send(data)
})


router.get('/api/user/:username', function(req, res){
    let data = {
      '_id':12345,
      'username':req.params.username,
      'public_key':'-----BEGIN PGP PUBLIC KEY BLOCK ... '
    }
    res.json(data);
})


module.exports = router;
