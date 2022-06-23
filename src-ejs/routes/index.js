const { Router } = require('express');
const router = Router();
const productsRoutes = require('./productsRoutes');

//home
router.get('/', (req, res) => {
    try {
        res.render('pages/index');
    } catch (error) {
        console.log('Ocurrio el siguiente error', error);
        res.sendStatus(500);
    }
    
})
//productos
router.use('/productos', productsRoutes);

//export
module.exports = router;