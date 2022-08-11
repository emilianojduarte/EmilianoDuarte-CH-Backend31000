//DECLARACIONES
import { Router } from "express";
const router = Router();
import cors from "cors";

//imports
import { postLogIn, getLogIn, deletetLogIn } from "../controllers/login.controllers.js";

//ACCIONES
router.post("/", cors(), postLogIn);
router.get("/", cors(), getLogIn);
router.delete("/", cors(), deletetLogIn);

export default router;