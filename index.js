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

//Lectura y parseo del body (Importante ponerlo antes de las rutas)
app.use(express.json());

//base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


//para lebantar el servidor
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
} )



//pfmgiXOrcw10HMqG
//main_user

