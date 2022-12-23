require('dotenv').config();
// import express from 'express';
//seria lo mismo que:
//pero asi se hace cuando estamos trabajando directamente con js y node
const express = require('express');
const cors = require('cors')
//Me gusta más la desestructuración porque puede que mañana agregue más cosas
const {dbConnection} = require('./database/config')


//crear servidor express
const app = express();

//Configurar CORS
//use -> middelware-> ejecuta siempre su instrucción cada vez que alguien pasa por aquí.
app.use(cors());

console.log(process.env);

//base de datos
dbConnection();

//Rutas
//ponemos que se va a ejecutar cuando alguien haga una solicitud al / de mi aplicación
app.get('/', (req, res) => {

    res.json({
        ok:true,
        msg:'Hola mundo'
    });

});

//para lebantar el servidor
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
} )



//pfmgiXOrcw10HMqG
//main_user

