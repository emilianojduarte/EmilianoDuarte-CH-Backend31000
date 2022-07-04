//clase contenedora del archivo para la persistencia
const Contenedor = require('../utils/contenedor.utils');
const archivo = new Contenedor();

//funciones
const getProducts = (req, res) => {
    try {
        archivo.getAll().then(resultado =>{
            res.send(resultado);
        })
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer obtener los productos', error);
        res.sendStatus(500);
    }
    
}
const getProduct = (req, res) => {
    try {
        archivo.getById(req.params.id).then(resultado =>{
            res.send(resultado)
        });
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer obtener un producto', error);
        res.sendStatus(500);
    }
}
const postProduct = (req, res) => {
    try {
        archivo.addOne(req.body);
        res.sendStatus(200);
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer agregar un producto', error)
        res.sendStatus(500);
    }
}
const putProduct = (req, res) => {
    try {
        archivo.updateOne(req.params.id, req.body).then(resultado => {
            res.send(resultado);
        })
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer actualizar el producto', error)
        res.sendStatus(500);
    }
}
const deleteProduct = (req, res) => {
    try {
        archivo.deleteOne(req.params.id).then(resultado => {
            res.send(resultado);
        })
    } catch (error) {
        console.log('Ocurrio el siguiente error al querer eliminar el producto', error)
        res.sendStatus(500);
    }
}

//export
module.exports = { getProducts, getProduct, postProduct, putProduct, deleteProduct };