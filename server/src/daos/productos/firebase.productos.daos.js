//IMPORT
import ContenedorFirebase from "../../contenedores/firebase.contenedores.js";

//CLAS EXTENDS
class ProductDaoFirebase extends ContenedorFirebase {
    constructor () {
        super("productos");
    }
}

export default ProductDaoFirebase;