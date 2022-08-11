//DECLARACIONES
import express from "express";
const app = express();
import http from "http";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

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
let corOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corOptions));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

//--------------------------------------------//

//APLICACION

//sessions (debería moverla a un helper o service?)
const mongoStoreOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.PAK_MONGO,
      mongoStoreOptions,
    }),
    secret: "CoderHouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 600000 },
  })
);

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
  //console.log("Se conectó el cliente con id: ", socket.id);
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
