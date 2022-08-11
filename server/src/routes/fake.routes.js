//DECLARACIONES
import { Router } from "express";
const router = Router();
//imports
import getProducts from "../controllers/fake.controller.js";

//ACCIONES
router.get("/", getProducts);

//export
export default router;
