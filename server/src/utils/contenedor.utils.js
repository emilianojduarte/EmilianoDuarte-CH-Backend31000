//CONEXION
const dbProductos = require('../db/dbMariaConnecion');

//CLASE
class Contenedor{
    constructor(db){
        this.db = db;
    }
    async getAll () {
        try {
            const productsAll = await dbProductos.select('*').from('products'); 
            return productsAll;
        } catch (error) {
            console.log("Ocurrio el siguiente error al querer obtener los productos: ", error);
        }
    }
    async addProductToDB (producto) {
        try {
            //le agrego el timestamp
            producto.timestamp = new Date().toLocaleString("fr-FR");
            await dbProductos('products').insert(producto)
        } catch (error) {
            console.log("Ocurrio el siguiente error al querer obtener los productos: ", error);
        }
    }
    async getById (id) {
        try {
            let resultado;
            const busqueda = await dbProductos.from('products').where({id});
            if (busqueda != []){
                resultado = busqueda
            } else {
                resultado = "El producto no existe";
            }
            return resultado;
        } catch (error) {
            console.log(`Error al querer obtener el producto con ID: ${id}`);
        }
    }
    async updateOne (id, productInfo) {
        try {
            let resultado;
            const devolucion = await dbProductos.from('products').where('id', '=', id).update(productInfo);
            if (devolucion != 0) {
                resultado = `El producto con ID ${id} fue actualizado correctamente`;
            } else {
                resultado = `El producto con ID ${id} no pudo ser encontrado o no existe`;
            }
            return resultado;
        } catch (error) {
            console.log("Ocurrio el siguiente error al querer actualizar el producto con ID ", id);
        }
    }
    async deleteOne (id) {
        try {
            let resultado;
            const devolucion = await dbProductos('products').where({id}).del();
            if (devolucion != 0) {
                resultado = `El producto con ID ${id} fue borrado correctamente`;
            } else {
                resultado = `El producto con ID ${id} no pudo ser encontrado o no existe`;
            }
            return resultado;
        } catch (err) {
            console.log("Ocurrio el siguiente error al querer borrar el producto con ID ", id);
        }
    }
}

//export
module.exports = Contenedor;