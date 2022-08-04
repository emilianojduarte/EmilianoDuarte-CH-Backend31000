//DECLARACIONES
//express
import express from "express";
const app = express();
import http from "http";
import cors from "cors";

//rutas
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import rutas from "./routes/index.routes.js";

//env
import dotenv from "dotenv";
dotenv.config();
const puerto = process.env.PORT;

//conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas estáticas - public
app.use(express.static(path.join(__dirname, "../public")));

//io server y cors
import { Server } from "socket.io";
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

//--------------------------------------------//

//APLICACION

//rutas
app.use("/api", rutas);
app.use("/*", (req, res) => {
  res.status(404).send({
    error: -2,
    descripcion: `Ruta ${req.url} con método ${req.method} aún no implementada`,
  });
});

//Chat - IO Sockets
import { addMsg, getAllMsgs } from "./utils/mensages.utils.js";
//evento
io.on("connection", async (socket) => {
  //connect
  console.log("Se conectó el cliente con id: ", socket.id);
  //mensajes
  let arrayMensajes = await getAllMsgs();
  socket.emit("server:msgs", arrayMensajes);
  socket.on("client:msg", async (msgInfo) => {
    await addMsg(msgInfo);
    arrayMensajes = await getAllMsgs();
    io.emit("server:msgs", arrayMensajes);
  });
  //disconnect
  socket.on("disconnect", () => {
    console.log(`Se deconectó el cliente ${socket.id}`);
  });
});

//listen
server.listen(puerto, (error) => {
  try {
    console.log("El servidor está escuchando el puerto: ", puerto);
  } catch {
    console.log("Error al iniciar el server: ", error);
  }
});
