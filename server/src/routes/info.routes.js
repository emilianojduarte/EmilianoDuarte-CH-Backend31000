//DECLARACIONES
import { Router } from "express";
const router = Router();
//imports
import { getInfo } from "../controllers/info.controllers.js";

//ACCIONES
router.get("/", getInfo);


//export
export default router;
