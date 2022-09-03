//DECLARACIONES
import express from "express";
const app = express();
import http from "http";
import cors from "cors";
import { addMsg, getAllMsgs } from "./utils/mensages.utils.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import hashPassword from "./helpers/hashpassword.helpers.js";
import checkPassword from "./helpers/checkpassword.helpers.js";
import { UserDao } from "./daos/index.daos.js";
import config  from "./utils/config.utils.js";
import cluster from "cluster";
import os from "os";

//middlwares
import { loggerInfo } from "./middlewares/loggerInfo.middlewares.js";
import { loggerWarn } from "./middlewares/loggerWarn.middlewares.js";

//rutas
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import rutas from "./routes/index.routes.js";

//env
import dotenv from "dotenv";
dotenv.config();
const puerto = 3002;

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
console.log("Antes de entrar al if. Config.mode: ", config.mode);
console.log("Antes de entrar al if. Cluster primary: ", cluster.isPrimary);
if (config.mode === "cluster" && cluster.isPrimary) {
  console.log("Entró en cluster y primary");
  os.cpus().map(() => {
    cluster.fork();
  });
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died.`);
    cluster.fork();
  });
} else {
  console.log("Entró en el else");
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
  app.use(passport.initialize());
  app.use(passport.session());
  const registerStrategy = new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const existingUser = await UserDao.existe({ username: username });
        if (existingUser) {
          return done({ error: true, message: "El usuario ya existe" }, null);
        }
        const newUser = {
          username: username,
          password: hashPassword(password),
        };
        const createdUser = await UserDao.guardar(newUser);
        return done(null, createdUser);
      } catch (error) {
        console.log(
          "Ocurrio el siguiente error registrando el usuario: ",
          error
        );
        return done("Error en el registro", null);
      }
    }
  );
  const loginStrategy = new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserDao.existe({ username: username });
      if (!user || !checkPassword(password, user.password)) {
        return done(null, null);
      }
      return done(null, user);
    } catch (error) {
      console.log("Ocurrio el siguiente error en el login: ", error);
      done("Error login", null);
    }
  });
  passport.use("register", registerStrategy);
  passport.use("login", loginStrategy);
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    UserDao.listarUno(id, function (error, user) {
      done(error, user);
    });
  });
  app.post("/register", passport.authenticate("register"), (req, res) => {
    let mensaje = "Usuario creado correctamente";
    res.send({ ok: true, mensaje });
  });
  app.post("/login", passport.authenticate("login"), (req, res) => {
    if (req.isAuthenticated()) {
      let user = req.user;
      res.json(user.username);
    } else {
      console.log("no está autenticado");
    }
  });
  // app.get(
  //   "/login",
  //   (req, res)=>{
  //     if (req.user){
  //       let user = req.user;
  //       res.json(user.username);
  //     }else{
  //       res.send("No se encuentra autenticado");
  //     }
  //   }
  // );
  app.get("/logoff", (req, res) => {
    try {
      console.log("Entró en el delete");
      req.session.destroy((error) => {
        console.log("error en el callback del destroy: ", error);
      });
      res.send({ ok: true, mensaje: "Sesion Cerrada" });
      return;
    } catch (error) {
      console.log("Ocurrio erro en login delete: ", error);
    }
  });
  //rutas
  app.use("/api", loggerInfo, rutas);
  app.use("/*", loggerWarn, (req, res) => {
    res.status(404).send({
      error: -2,
      descripcion: `Ruta ${req.url} con método ${req.method} aún no implementada`,
    });
  });

  //Chat - IO Sockets

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
}
