//DECLARACIONES
import { Router } from "express";
const router = Router();

//imports
import {
  postLogIn,
  getLogIn,
  deletetLogIn,
} from "../controllers/login.controllers.js";

//ACCIONES
router.post("/", postLogIn);
router.get("/", getLogIn);
router.delete("/", deletetLogIn);

export default router;
