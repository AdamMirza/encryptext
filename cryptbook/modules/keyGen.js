function newKeyPair(){

  const openpgp = require('openpgp')

  var options = {
    userIds: [{ name:'Jon Smith', email:'jon@example.com' }], // multiple user IDs
    numBits: 1024,//4096,                                            // RSA key size
    passphrase: 'super long and hard to guess secret'         // protects the private key
  };

  let privkey, pubkey
  return openpgp.generateKey(options);
}

module.exports = {
  newKeyPair: newKeyPair
}
