const openpgp = require("openpgp");
//decript modules 
//needs: my private key + an encripted msg 
//returns : a plain readable text
exports.decrypt = function(msg, privateKey){
    const options = {
        message: openpgp.message.read(msg), 
        password : privateKey, 
        format: 'string'
    }
    openpgp.decrypt(options).then((plainText)=>{
        return plainText.data; 
    });
    
}
