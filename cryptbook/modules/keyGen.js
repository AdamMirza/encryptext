function newKeyPair(data){
  const openpgp = require('openpgp')

  options = {
    userIds: [{ name:data.username, email:data.email }], // multiple user IDs
    numBits: 1024,                                           // RSA key size
    passphrase: 'super long and hard to guess secret'         // protects the private key
  };

  return openpgp.generateKey(options)
}

module.exports = {
  newKeyPair: newKeyPair
}
