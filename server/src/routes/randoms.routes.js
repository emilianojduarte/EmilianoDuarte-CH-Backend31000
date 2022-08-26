//DECLARACIONES
import { Router } from "express";
const router = Router();
//imports
import { getRandoms } from "../controllers/randoms.controllers.js"

//ACCIONES
router.get("/", getRandoms);

//export
export default router;