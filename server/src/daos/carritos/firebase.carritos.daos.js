//IMPORT
import ContenedorFirebase from "../../contenedores/firebase.contenedores.js";

//CLASS EXTENDS
class CartDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("compras");
  }
}

export default CartDaoFirebase;
