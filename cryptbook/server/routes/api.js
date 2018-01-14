const express = require('express')
const router = express.Router()
const keyGen = require('../../modules/keyGen')
var bodyParser = require('body-parser')
router.get('/api',async function(req, res) {
  res.send('api page')
})

router.get('/test',async function(req, res) {
  let key = await keyGen.newKeyPair();
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


module.exports = router
