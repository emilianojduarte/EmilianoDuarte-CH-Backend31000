//Clase contenedora
import { MensajeDao } from "../daos/index.daos.js";
//normalizr
import { schema, normalize } from "normalizr";
const author = new schema.Entity("author");
const mensaje = new schema.Entity(
  "mensaje",
  { author: author },
  { idAttribute: "_id" }
);
const schemaMensajes = new schema.Entity("mensajes", { mensajes: [mensaje] });

//funciones
const addMsg = async (msgInfo) => {
  try {
    await MensajeDao.guardar(msgInfo);
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error al querer agregar un producto",
      error
    );
  }
};
const getAllMsgs = async () => {
  try {
    const mensajes = await MensajeDao.listarTodos();
    let resultadoNormalizado = normalize(
      { id: "mensajes", mensajes },
      schemaMensajes
    );
    return resultadoNormalizado;
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error al querer obtener los productos",
      error
    );
  }
};

//export
export { addMsg, getAllMsgs };
