//DECLARACIONES
import getMock from "../utils/fakedata.utils.js";

//funciones
const getProducts = async (req, res) => {
  try {
    const resultado = await getMock();
    res.status(200);
    res.send(resultado);
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error al querer obtener los productos",
      error
    );
  }
};

//export
export default getProducts;
