//DECLARACIONES
//express
const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");

//rutas
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

//io server y cors
const { Server } = require('socket.io');
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

//db handlers
const Mensajes = require('./utils/mensages.utils');
const dbMsg = new Mensajes;
const Contenedor = require('./utils/contenedor.utils');
const dbProducts = new Contenedor;
//--------------------------------------------//

//APLICACION

//rutas
app.use('/api', rutas);
app.use('/*', (req, res) =>{
    res.status(404).send({ error : -2, descripcion: `Ruta ${req.url} con método ${req.method} aún no implementada` });
})

//io sockets
io.on('connection', async socket => {
    //connect
    console.log('Se conectó el cliente con id: ', socket.id);
    //productos
    let arrayProductos = await dbProducts.getAll();
    socket.emit('server:products', arrayProductos);
    socket.on('client:product', async productInfo => {
        await dbProducts.addProductToDB(productInfo);
        arrayProductos = await dbProducts.getAll();
        io.emit('server:products', arrayProductos);
    })
    //mensajes
    let arrayMensajes = await dbMsg.getAllMsgs();
    socket.emit('server:msgs', arrayMensajes);
    socket.on('client:msg', async msgInfo => {
        await dbMsg.addMsgToDB(msgInfo);
        arrayMensajes = await dbMsg.getAllMsgs();
        io.emit('server:msgs', arrayMensajes);
    })
    //disconnect
    socket.on('disconnect', () => {
        console.log(`Se deconectó el cliente ${socket.id}`)
    })
})

//listen
server.listen(puerto, (error) => {
    try{
        console.log('El servidor está escuchando el puerto: ', puerto)
    } catch {
        console.log('Error al iniciar el server: ', error);
    }
})