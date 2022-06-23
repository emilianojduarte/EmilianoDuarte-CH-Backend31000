//DECLARACIONES
const express = require('express');
const app = express();
const rutas = require('./routes/index.js')
const puerto = 8080;
const path = require('path');

//--------------------------------------------//

//APLICACION

//conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas estáticas
app.use('/public', express.static( __dirname + '/public' ));

//set views (pug)
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//ruteo
app.use('/', rutas);

//control
app.listen(puerto, () => {
    try{
        console.log(`El servidor está escuchando el puerto: ${puerto}`)
    }
    catch(error){
        console.log("Ocurrió el siguiente error al iniciar: ", error);
    }
})
