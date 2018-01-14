const openpgp = require("openpgp");
//encription module: making jibberish
//return : encripted message 
//requires : plain text, public key of friend, friend username
exports.encrypt = function(msg,friend, friendPK){
    const options = {
        data: msg, 
        password : friendPK, 
        armor : true
    }
    openpgp.encrypt(options).then((cipherText)=>{
        return cipherText.message.packets.write()+"@"+friend; 
    });
}
