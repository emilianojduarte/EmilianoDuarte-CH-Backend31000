//DECLARACIONES
const { Router } = require('express');
const router = Router();
//imports
const { getNewCart, deleteCart, getCartProducts, postProductToCart, deleteProductFromCart } = require('../controllers/cart.controllers');

//ACCIONES
router.get('/', getNewCart);
router.delete('/:id', deleteCart);
router.get('/:id/productos', getCartProducts);
router.post('/:id/productos', postProductToCart);
router.delete('/:id/productos/:id_prod', deleteProductFromCart);

//export
module.exports = router; 