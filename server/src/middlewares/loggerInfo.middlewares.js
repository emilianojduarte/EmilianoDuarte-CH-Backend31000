//Imports
import logger from "../utils/logger.utils.js";
//funcion
const loggerInfo = (req, res, next) => {
  let metodo = req.method;
  let url = req.url;

  logger.info(`Petición a la ruta ${url} con método ${metodo}`);

  next();
};

export { loggerInfo };
