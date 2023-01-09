
/*
    Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Ruta que conecta usuarios
router.get('/', validarJWT, getUsuarios);

//Ruta que crea usuario
//el segundo argumento pueden ser varios middlewares, si son varios los ponemos entre llaves[] como si fuera un arreglo
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        //validar campos siempre el último a llamar
        validarCampos,
    ],
    crearUsuario
);

router.put('/:id',
     [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,

     ], 
     actualizarUsuario
);

router.delete('/:id',
    validarJWT,
    borrarUsuario
);



module.exports = router;