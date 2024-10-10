const jwt = require('jsonwebtoken');

const jsonJWT = ( uid = '' ) => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            // expiresIn: '24h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se generó el token');
            } else{
                resolve(token);
            }
        })

    })

}

module.exports = {
    jsonJWT
}