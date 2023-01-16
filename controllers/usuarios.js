const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;


    // const usuarios = await Usuario
    //                         .find({}, 'nombre email role google')
    //                         .skip(desde)
    //                         .limit(5);

    // const total = await Usuario.count();
    
    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),

         Usuario.countDocuments()
    ])

    //podemos poner más filtros validaciones etc.

    res.json({
        ok:true,
        usuarios,
        //con lo siguiente tenemos la info del uid del usuario que hizo la petición
        total
    });

}

const crearUsuario = async (req, res = response ) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Ya engo el usuario y lo grabo en la base de datos save() es una promesa -> va a ejecutar la promesa y va a resolver la respuesta, puede que de un error o algo, necesito esperar a que save() termine así que le pongo el await -> await -> espera a que esta promesa termine.(recuerda que para utilizar el await tenemos que estar dentro de una función async) 
        await usuario.save();

        
        //Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );
    
        res.json({
            ok:true,
            usuario, //usuario:usuario -> el nombre de la propiedad es igual a la variable
            token
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado... revisar logs'
        })
    }


}

const actualizarUsuario = async ( req, res = response )=> {

    const uid = req.params.id;

    try{

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:"No existe un usuario por ese id o"
            });
        }


        //ACTUALIZACIONES
        //extraigo lo que no quiero que el user cambie y el email que quiero usarlo aparte
        const {password, google, email, ...campos} = req.body;

        if (usuarioDB.email !== email ){
            //significa que la persona quiere cambiar el email tengo que buscar si ya hay un usar con el email que quiere poner
            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese email'
                });
            }
        }

        //le regreso el email
        campos.email = email;



        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new:true} );

        res.json({
            ok:true,
            usuario: usuarioActualizado
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })

    }

}





const borrarUsuario = async( req, res = response) =>{

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok:true,
            msg: 'Usuario eliminado'
        });

    
    } catch (error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })

    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}