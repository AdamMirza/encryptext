function newKeyPair(options){
  const openpgp = require('openpgp')

  let options = {
    userIds: [{ name:options.username, email:options.email }], // multiple user IDs
    numBits: 1024,                                           // RSA key size
    passphrase: 'super long and hard to guess secret'         // protects the private key
  };

  return openpgp.generateKey(options);
}

module.exports = {
  newKeyPair: newKeyPair
}
