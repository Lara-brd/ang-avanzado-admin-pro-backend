const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {


    //leer el Token
    const token = req.header('x-token');
    
    if( !token ){
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET);
        console.log( uid );
        req.uid = uid;
        //función que tengo que llamar si todo sale correctamente
        next();

    } catch (error){
        return res.status(401).json({
            ok:false,
            msg:'Token no válido'
        });
    }


}

module.exports = {
    validarJWT
}