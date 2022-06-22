//DECLARACIONEs
const { Router } = require('express');
const router = Router();
const { getProductos, addProducto } = require('../controllers/productsController.js');
//ACCIONES
router.get('/', getProductos);
router.post('/', addProducto);

//Pendientes de implementar:
//router.get('/:id', getProducto);
//put sobre un producto específico
// router.put('/:id', (req, res) => {
//     let resultado
//     const indiceEncontrado = productos.findIndex((producto) => {
//         return producto.id == req.params.id;
//     });
//     if (indiceEncontrado === -1) {
//         resultado = {error: 'El producto no existe'}
//     } else {
//         productos[indiceEncontrado] = req.body;
//         resultado = "Producto actualizado con exito"
//     }
//     res.json(resultado)
// })
//delete sobre un producto específico
// router.delete('/:id', (req, res) =>{
//     const indiceEncontrado = productos.findIndex((producto) => {
//         return producto.id == req.params.id;
//     });
//     let resultado = "";
//     if (indiceEncontrado === -1) {
//         resultado = {error: 'El producto no existe'}
//     } else {
//         productos.splice(indiceEncontrado, 1);
//         resultado = "Producto eliminado con éxito"
//     }
//     res.json(resultado);
// })

//export
module.exports = router; 