const express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var dbName = "EncrytText";
var dbpassword = "ouwnhEPf2Vf2VfMgfQG";
const router = express.Router();
const keyGen = require("../../modules/keyGen");
const encrypt = require("../../modules/encrypt");
const decrypt = require("../../modules/decrypt");
var bodyParser = require("body-parser");
let session = require("express-session");

//use middlewares:
router.use(session({
    secret: "no hackathoners can know ",
    resave: false,
    saveUninitialized : true,
    cookie: {secure: true }
}));

var url =
  "mongodb://get-secured:ouwnhEPf2VfMgfQG@cluster0-shard-00-00-bwprg.mongodb.net:27017,cluster0-shard-00-01-bwprg.mongodb.net:27017,cluster0-shard-00-02-bwprg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
//mongoose.connect('mongodb://username:password@host:port/database')
router.get("/api", function(req, res) {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      res.send("Error connecting " + err);
      return;
    }
    var db = db.db("EncrytText");
    var myobj = {
      Name: "Company Inc",
      username: "test1",
      email: "Highway 37",
      public_key: "ebgwxduy",
      password: "lol",
      private_key: "xeg927d297g",
      contacts: { eb: "echn", key: "exhb " }
    };
    db.collection("Users").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      return;
    });

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
  pubkey = key.publicKeyArmored; // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
  let data = {
    public_key: pubkey,
    private_key: privkey
  };
  res.send(data);
});

//return user public information
router.get("/api/Users/:username", function(req, res) {
  let data = {
    _id: "",
    username: req.params.username,
    public_key: "",
    contacts: {}
  };

  MongoClient.connect(url, (err, db) => {
    console.log(1);
    if (err) {
      res.send("Error connecting " + err);
      return;
    }
    var db = db.db("EncrytText");
    var query = { username: req.params.username };
    db
      .collection("Users")
      .find(query)
      .toArray(function(err, result) {
        if (err) {
          throw err;
        }
        console.log(result[0]);
        data["_id"] = result[0]._id;
        data["public_key"] = result[0].public_key;
        data["contacts"] = result[0].contacts;
        res.json(data);
      });
    //res.send("connected successfully to database");
  });
  //res.send(data);
});

//Encrypt a Message: make plain text a jibberish
//requires: msg + friendPK
router.post("/api/messages/encrypt",async function(req,res){
    let message = await encrypt.encrypt(req.body.msg,req.body.friendPK)
    res.json({"Encrypted": message});
});

//Decrypt a Message: make jibberish a plain clean text
//requires: msg (private key in session)
router.post("/api/messages/decrypt",async function(req,res){
    if ( ! req.session.user){
        res.json({"error117": "Please try logging in"});
    } else {
        let message = await decrypt.decrypt(req.body.msg,req.session.user.private_key)
        res.json({"Decrypted": message});
    }
});

router.get("/api/me",function(req,res){
    if ( !req.session.user ){
        //res.json({"No Data": "Please try Logging In"});
        contacts = {"contacts": [
            { eb: "111", key: "0000" },
            { eb: "222", key: "9999" },
            { eb: "333", key: "8888" },
            { eb: "444", key: "7777" }
        ]};
        res.json(contacts);
    } else {
        res.json(req.session.user);
    }
});

module.exports = router;



$.ajax({
	method:'post',
	url:'/api/messages/encrypt',
	data:{
    msg:'hello old friend',
    friendPK:'-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v2.6.1\r\nComment: https://openpgpjs.org\r\n\r\nxo0EWluT1wEEAM+fZZGY98bvo+0NNMfo8Ut6t3Q6U0hx/9cIrlyTTQ/1CtEH\nRj5iFKWeiQfVivUMPO57YVoykVXSDVfyJRLc755qZHTKckjo8gVSA84ul111\n96bekkufHR2VWflnmkbJ3mn4/Ay6cf1jdxpAg4ZlnKoU/cOTbByYEt6vy/VX\nGVnhABEBAAHNHWFkYW0gPGFkYW1jb2xsaW5zNkBnbWFpbC5jb20+wrUEEAEI\nACkFAlpbk9cGCwkHCAMCCRCvsOnzbt1O6wQVCAoCAxYCAQIZAQIbAwIeAQAA\n5fcEAI7FGJ1OJuL/8qxAu22VY5rPU6B9BVe1MEemk5Q7HlPJL9BX+uj/e2Yl\niHDO4XOopV/L8BHUf5+O5uQ81St9EgG4tSrFT8t4ncoCrm1v73p9iPu5e8b7\nNjl9iNs3ItX02t8yhWaTUQ0b6MLaV7Fphlq+6hXQwDEBzeW10TXGWNqRzo0E\nWluT1wEEAIIr1ghBHCkePtqp64JuNDVE4vFlwDf0JOLjoTelU6ROJuGFksFY\nHzdU5jtetZj7i+jKVgYtShX+YJnXt7WpxvDHLCnaPEYz6qJ0E701WtAluWG+\n3VsGAtb7eRkUyLKSdVVi9C1reUhcpcCCxwpPBEhYfKAs+SsbSfu1mgdeI4GZ\nABEBAAHCnwQYAQgAEwUCWluT1wkQr7Dp827dTusCGwwAAEaHA/9iK30uIFE0\nJTVJr4t3o3PockGRzwUVeN342hBVvSC0kbDdO7YqjqMCl37vleRzawNPJFXl\n4waf2LCqhKWJji4EqyGKDfgG+yLoQiuVayxFY8EMjam7fp4BHyBpyShQkI14\nLp+u03+lmXBScL2ApFHLsTSXeXP7t2CyCHjcHsODIA==\r\n=lI0i\r\n-----END PGP PUBLIC KEYBLOCK-----\r\n\r\n'},
	success(data){return data},
	error(e){return e}
})
