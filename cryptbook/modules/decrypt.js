const openpgp = require("openpgp");
//decript modules
//needs: my private key + an encripted msg
//returns : a plain readable text
exports.decrypt = function(msg, privateKey){
    const options = {
        message: openpgp.message.readArmored(msg),
        privateKeys: openpgp.key.readArmored(privateKey).keys[0]
    }
    return openpgp.decrypt(options);
}
