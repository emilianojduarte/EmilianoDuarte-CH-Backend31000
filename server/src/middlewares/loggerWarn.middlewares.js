//Imports
import logger from "../utils/logger.utils.js";
//funcion
const loggerWarn = (req, res, next) => {
  let metodo = req.method;
  let url = req.originalUrl;

  logger.warn(
    `Petición a la ruta ${url} con método ${metodo} aún no implementada`
  );

  next();
};

export { loggerWarn };
