//DECLARACIONES
//express
const express = require('express');
const app = express();
const path = require('path');
const rutas = require('./routes/index.routes.js');
//env
require('dotenv').config();
const puerto = process.env.PORT;
//conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//rutas estáticas - public
app.use(express.static(path.join(__dirname, '../public')));

//--------------------------------------------//

//APLICACION
app.use('/api', rutas);

//listen
app.listen(puerto, (error) => {
    try{
        console.log('El servidor está escuchando el puerto: ', puerto)
    } catch {
        console.log('Error al iniciar el server: ', error);
    }
})
