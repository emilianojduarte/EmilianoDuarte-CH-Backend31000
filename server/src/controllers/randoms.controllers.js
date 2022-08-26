//imports
import { fork } from "child_process";

//funciones
const getRandoms = (req, res) => {
  try {
    let cant = req.query.cant;
    if (isNaN(cant)) {
      cant = 100000000;
    }
    const calc = fork("./src/helpers/calcrandoms.helpers.js");
    calc.on("message", function (msg) {
      if(msg === "listo"){
        calc.send(cant);
      }
      if(typeof(msg) === "object" ){
        res.send(msg);
      }
    });
  } catch (error) {
    console.log("Ocurrio un error en getRandoms: ", error);
    res.sendStatus(500);
  }
};

export { getRandoms };
