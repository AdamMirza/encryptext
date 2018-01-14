const openpgp = require("openpgp");
//encription module: making jibberish
//return : encripted message
//requires : plain text, public key of friend, friend username
exports.encrypt = function(msg, friendPK){
    const options = {
        data: msg,
        publicKeys : openpgp.key.readArmored(friendPK).keys[0]
    }
    return openpgp.encrypt(options).then((cipherText)=>{
        return cipherText.data+"@"+friend;
    });
}
