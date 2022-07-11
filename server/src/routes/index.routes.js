const { Router } = require('express');
const router = Router();
const productsRoutes = require('./product.routes');
const cartRoutes = require('./cart.routes');
const path = require('path');
//home
router.get('/home', (req, res) => {
    try {
        res.send('Funciona y estás en home')
    } catch (error) {
        console.log('Hubo un error al accedor al home', error)
        res.sendStatus(500).send('Internal server error')
    }
})
//productos
router.use('/productos', productsRoutes);
//carrito
router.use('/carrito/', cartRoutes);
//export
module.exports = router;