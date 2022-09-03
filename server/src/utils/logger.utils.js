//IMPORTS
import winston from "winston";
import dotenv from "dotenv";
dotenv.config();


//Funciones
const buildProdLogger = () => {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({filename: "warn.log", level: "warn"}),
      new winston.transports.Console({level: "info"})
    ],
  });

  return prodLogger;
};

const buildDevLogger = () => {
  const devLogger = winston.createLogger({
    transports: [new winston.transports.Console({ level: "debug" })],
  });

  return devLogger;
};

let logger;

if (process.env.NODE_ENV === "PROD") {
  logger = buildProdLogger();
} else {
  logger = buildDevLogger();
}

export default logger;