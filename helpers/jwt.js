const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise( (resolve, reject ) => {


        const payload = {
            //en el payload información no sensible
            uid
        };
    
    
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            //3er argumento duracion token
            expiresIn: '12h'
    
            //aquí callback con error y el token que necesito responder
            }, ( err, token )=>{
    
                if(err){
                    console.log(err);
                    reject('No se pudo generar el JWT');
                } else {
                    resolve( token );
                }
    
            });

    });


}


module.exports = {
    generarJWT,
}