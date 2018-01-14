const express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var dbName = "EncrytText";
var dbpassword = "ouwnhEPf2Vf2VfMgfQG";
const router = express.Router();
const keyGen = require('../../modules/keyGen')
var bodyParser = require('body-parser')

router.post('/login',function(req, res){
  console.log(1);
  res.status(200).send('Login successful.')
})
