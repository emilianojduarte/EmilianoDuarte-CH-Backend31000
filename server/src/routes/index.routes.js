//IMPORTS
import { Router } from "express";
const router = Router();
import productsRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";
import fakeRoutes from "./fake.routes.js";
//home
router.get("/home", (req, res) => {
  try {
    res.send("Funciona y estás en home");
  } catch (error) {
    console.log("Hubo un error al accedor al home", error);
    res.sendStatus(500).send("Internal server error");
  }
});
//productos
router.use("/productos", productsRoutes);
//carrito
router.use("/carrito/", cartRoutes);
//productos-test (creados con Faker)
router.use("/productos-test", fakeRoutes);
//export
export default router;
