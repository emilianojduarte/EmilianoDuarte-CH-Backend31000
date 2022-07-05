//clase contenedora del archivo para la persistencia
const Compras = require('../utils/compras.utils');
const archivo = new Compras();

//funciones
const getNewCart = (req, res) => {
        archivo.createCart().
        then(resultado =>{
            res.send(resultado);
        })
        .catch(error =>{
            console.log('Ocurrio el siguiente error al querer crear un nuevo carrito', error);
            res.sendStatus(500);
        }) 
}
const deleteCart = (req, res) => {
    try {
        archivo.deleteOneCart(req.params.id).then(resultado => {
            res.send(resultado);
        })
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer crear un nuevo carrito', error);
        res.sendStatus(500);
    }
}
const getCartProducts = (req, res) => {
    try {
        archivo.listProducts(req.params.id).then(resultado =>{
            res.send(resultado);
        })
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer obtener los productos del carrito', error);
        res.sendStatus(500);
    }
}
const postProductToCart = (req, res) => {
    try {
        archivo.addProductToCart(req.params.id, req.body).then(resultado => {
            res.send(resultado)
        })
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer agregar productos al carrito', error);
        res.sendStatus(500);
    }
}
const deleteProductFromCart = (req, res) => {
    try {
        archivo.deleteOneFromCart(req.params.id, req.params.id_prod).then(resultado => {
            res.send(resultado);
        })
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer eliminar el producto del carrito', error);
        res.sendStatus(500);
    }
}
//export
module.exports = { getNewCart, deleteCart, getCartProducts, postProductToCart, deleteProductFromCart };