const { Router } = require('express');
const router = Router();
const productsRoutes = require('./productsRoutes');

//home
router.get('/home', (req, res) => {
    res.send('Estas en home')
})
//productos
router.use('/productos', productsRoutes);

//export
module.exports = router;