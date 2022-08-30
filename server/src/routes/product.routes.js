//DECLARACIONES
import { Router } from "express";
const router = Router();
//imports
import {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";

//ACCIONES
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", postProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

//export
export default router;
