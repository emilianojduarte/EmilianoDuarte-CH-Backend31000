const { Router } = require('express');
const router = Router();
const productsRoutes = require('./productsRoutes');

//home
router.get('/', (req, res) => {
    res.render('home');
})
//productos
router.use('/productos', productsRoutes);

//export
module.exports = router;