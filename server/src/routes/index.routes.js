//IMPORTS
import { Router } from "express";
const router = Router();
import productsRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";
import fakeRoutes from "./fake.routes.js";
import loginRoutes from "./login.routes.js";
import infoRoutes from "./info.routes.js";
import randomsRoutes from "./randoms.routes.js";

//productos
router.use("/productos", productsRoutes);
//carrito
router.use("/carrito/", cartRoutes);
//productos-test (creados con Faker)
router.use("/productos-test", fakeRoutes);
//login
router.use("/login", loginRoutes);
//info
router.use("/info", infoRoutes);
//random
router.use("/randoms", randomsRoutes);
//export
export default router;
