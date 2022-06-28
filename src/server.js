/////DECLARACIONES
const express = require('express');
const app = express();
const puerto = 8080;
const path = require('path');
const expressServer = app.listen(puerto, () => {
    try{
        console.log(`El servidor está escuchando el puerto: ${puerto}`)
    }
    catch(error){
        console.log("Ocurrió el siguiente error al iniciar: ", error);
    }
});
//io server
const { Server: IOServer } = require('socket.io');
const io = new IOServer(expressServer);
//array
const msgArray = [];
const productos = [
    {
        "id": 1,
        "url": "https://cdn1.iconfinder.com/data/icons/_dock_icons___by_adrenn/128/kingston.png",
        "price": 3500,
        "description": "1x4GB Kingston ValueRAM DDR3"
    },
    {
        "id": 2,
        "url": "https://cdn1.iconfinder.com/data/icons/_dock_icons___by_adrenn/128/kingston.png",
        "price": 5499,
        "description": "1x8GB Kingston Fury DDR4"
    },
    {
        "id": 3,
        "url": "https://cdn1.iconfinder.com/data/icons/_dock_icons___by_adrenn/128/kingston.png",
        "price": 16108,
        "description": "2x16GB Kingston Fury Beast DDR4"
    },
    {
        "id": 4,
        "url": "https://cdn2.iconfinder.com/data/icons/metro-ui-dock/128/Intel.png",
        "price": 26950,
        "description": "10ma Generación Intel i3"
    },
    {
        "id": 5,
        "url": "https://cdn2.iconfinder.com/data/icons/metro-ui-dock/128/Intel.png",
        "price": 24999,
        "description": "10ma Generación Intel i5"
    },
    {
        "id": 6,
        "url": "https://cdn2.iconfinder.com/data/icons/metro-ui-dock/128/Intel.png",
        "price": 43399,
        "description": "10ma Generación Intel i7"
    },
    {
        "id": 7,
        "url": "https://cdn2.iconfinder.com/data/icons/metro-ui-dock/128/Intel.png",
        "price": 55900,
        "description": "10ma Generación Intel i9"
    },
    {
        "id": 8,
        "url": "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/15_Amd_logo_logos-128.png",
        "price": 32662,
        "description": "3ra Generación Ryzen 3"
    },
    {
        "id": 9,
        "url": "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/15_Amd_logo_logos-128.png",
        "price": 41999,
        "description": "3ra Generación Ryzen 5"
    },
    {
        "id": 10,
        "url": "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/15_Amd_logo_logos-128.png",
        "price": 61722,
        "description": "3ra Generación Ryzen 7"
    },
    {
        "id": 11,
        "url": "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/15_Amd_logo_logos-128.png",
        "price": 77400,
        "description": "3ra Generación Ryzen 9"
    }
];
//contenedor de archivo
const Contenedor = require('./contenedor.js');
dbChats = new Contenedor;
//--------------------------------------------//

/////APLICACION

//conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas estáticas - public
app.use(express.static(path.join(__dirname, '../public')));

//io sockets
io.on('connection', socket => {
    console.log('Se conectó el cliente con id: ', socket.id);
    //productos
    socket.emit('server:products', productos);
    socket.on('client:product', productoInfo => {
        productos.push(productoInfo);
        io.emit('server:products', productos);
    })
    //mensajes
    socket.emit('server:msgs', msgArray);
    socket.on('client:msg', msgInfo => {
        msgArray.push(msgInfo);
        dbChats.save(msgInfo);
        io.emit('server:msgs', msgArray)
    })
})

//file manager del chat

