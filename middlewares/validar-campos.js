const { response } = require('express');
const { validationResult } = require('express-validator')

//el next lo llamamos si el middleware pasa
const validarCampos = ( req, res = response, next) =>{

    const errores = validationResult( req );

    if( !errores.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors:errores.mapped()

        });
    }

    //si pasa este punto puedo llamar el next()
    next();

}

module.exports = {
    validarCampos
}