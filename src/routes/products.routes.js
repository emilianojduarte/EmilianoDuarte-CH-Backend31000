//DECLARACIONES
const { Router } = require('express');
const router = Router();
//imports
const { getProducts, getProduct, addProduct, updateProduct, removeProduct } = require('../controllers/products.controllers');
//import de midlewares
const { checkAuthorization } = require('../middlewares/middlewares');

//ACCIONES
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', checkAuthorization, addProduct);
router.put('/:id', checkAuthorization, updateProduct);
router.delete('/:id', checkAuthorization, removeProduct);

//export
module.exports = router; 