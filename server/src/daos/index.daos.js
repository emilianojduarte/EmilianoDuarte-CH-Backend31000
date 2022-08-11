//IMPORT
import dotenv from "dotenv";
dotenv.config();
//DECLARACIONES
let ProductDao;
let CartDao;
let MensajeDao;

//SWTICH DE ASIGNACION
switch (process.env.DATABASE) {
  case "mongo":
    const { default: ProductDaoMongo } = await import(
      "./productos/mongo.productos.daos.js"
    );
    const { default: CartDaoMongo } = await import(
      "./carritos/mongo.carritos.daos.js"
    );
    const { default: MensajeDaoMongo } = await import(
      "./mensajes/mongo.mensajes.daos.js"
    );
    ProductDao = new ProductDaoMongo();
    CartDao = new CartDaoMongo();
    MensajeDao = new MensajeDaoMongo();
    break;
  case "firebase":
    const { default: ProductDaoFirebase } = await import(
      "./productos/firebase.productos.daos.js"
    );
    const { default: CartDaoFirebase } = await import(
      "./carritos/firebase.carritos.daos.js"
    );
    const { default: MensajeDaoFirebase } = await import(
      "./mensajes/firebase.mensajes.daos.js"
    );
    ProductDao = new ProductDaoFirebase();
    CartDao = new CartDaoFirebase();
    MensajeDao = new MensajeDaoFirebase();
    break;
}

export { ProductDao, CartDao, MensajeDao };
