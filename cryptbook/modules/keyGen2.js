 async function newKeyPair(){

  const openpgp = require('openpgp')
  // openpgp.generateKey(options).then(function(key) {
  //   console.log(2);
  //     var privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
  //     var pubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
  // })
  var options = {
    userIds: [{ name:'Jon Smith', email:'jon@example.com' }], // multiple user IDs
    numBits: 1024,//4096,                                            // RSA key size
    passphrase: 'super long and hard to guess secret'         // protects the private key
  };
  let key = await openpgp.generateKey(options)
  keyPair = {
    pub: key.publicKeyArmored,
    priv: key.privateKeyArmored
  }
    //console.log(keyPair);
    return keyPair
}

module.exports = {
  newKeyPair: newKeyPair
}
