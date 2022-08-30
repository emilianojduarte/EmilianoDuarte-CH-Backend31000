//IMPORT
import ContenedorFirebase from "../../contenedores/firebase.contenedores.js";

//CLAS EXTENDS
class UserDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("usuarios");
  }
}

export default UserDaoFirebase;
