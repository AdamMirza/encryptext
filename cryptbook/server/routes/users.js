const express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var dbName = "EncrytText";
var dbpassword = "ouwnhEPf2Vf2VfMgfQG";
const router = express.Router();
const keyGen = require('../../modules/keyGen')
var bodyParser = require('body-parser')
var url ="mongodb://get-secured:ouwnhEPf2VfMgfQG@cluster0-shard-00-00-bwprg.mongodb.net:27017,cluster0-shard-00-01-bwprg.mongodb.net:27017,cluster0-shard-00-02-bwprg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"


router.post('/login',function(req, res){
  let username = req.body.username
  let password = req.body.password
  MongoClient.connect(url, function(err,db){
    if(err)
      console.error(err)

    var db = db.db("EncrytText");
    db.collection('Users').findOne({'username':username},function(err, data){
      console.log(data)
      if(data.password === password)
        res.status(200).json({})
      else
        res.status(401).json({})
    })
  })
})


module.exports = router;
