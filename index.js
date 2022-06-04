const express = require('express');
const app = express();
const puerto = 8080;
let visitas = 0;


app.use((req, res, next) => {
    visitas++;
    next();
})


app.get('/', (req, res) => {
    res.send('<h1 style="color: blue">Bienvenidos al server de Express</h1>');
})

app.get('/visitas', (req, res) => {
    res.send(`El servidor tuvo ${visitas} visitas`);
})

app.get('/fyh', (req, res) => {
    const date = new Date();
    res.json({fyh: date.toLocaleString()});
})


app.listen(puerto, (error) => {
    if(!error){
        console.log(`El servidor está escuchando el puerto: ${puerto}`)
    } else {
        console.log("Ocurrió el siguiente error al iniciar: ", error);
    }
})
