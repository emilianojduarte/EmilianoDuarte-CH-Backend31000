//DECLARACIONES
const { Router } = require('express');
const router = Router();
//imports
const { getProducts, getProduct, postProduct, putProduct, deleteProduct } = require('../controllers/products.controllers');
//import de midlewares
const { checkAuthorization } = require('../middlewares/middlewares');

//ACCIONES
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', checkAuthorization, postProduct);
router.put('/:id', checkAuthorization, putProduct);
router.delete('/:id', checkAuthorization, deleteProduct);

//export
module.exports = router; 