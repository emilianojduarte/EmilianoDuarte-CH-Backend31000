//IMPORTS
import { Router } from "express";
const router = Router();
import productsRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";
import fakeRoutes from "./fake.routes.js";
import loginRoutes from "./login.routes.js";

//productos
router.use("/productos", productsRoutes);
//carrito
router.use("/carrito/", cartRoutes);
//productos-test (creados con Faker)
router.use("/productos-test", fakeRoutes);
//login
router.use("/login", loginRoutes);
//export
export default router;
