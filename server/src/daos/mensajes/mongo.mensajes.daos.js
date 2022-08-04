import ContenedorMongo from "../../contenedores/mongo.contenedores.js";

//CLASS EXTENDES
class MessageDaoMongo extends ContenedorMongo {
  constructor() {
    super("chats", {
      author: {
        id: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: String, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
      },
      time: { type: String, required: true },
      text: { type: String, required: true },
    });
  }
}

export default MessageDaoMongo;
