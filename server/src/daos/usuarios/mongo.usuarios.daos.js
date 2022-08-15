//IMPORT
import ContenedorMongo from "../../contenedores/mongo.contenedores.js";

//CLASS EXTENS
class UserDaoMongo extends ContenedorMongo {
    constructor() {
        super("usuarios",{
            username: { type: String, required: true },
            password: { type: String, required: true },
        });
    }
}

export default UserDaoMongo;