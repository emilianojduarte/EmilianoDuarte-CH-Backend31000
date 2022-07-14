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
        //PENDIENTE DE ACTUALIZAR CON LA DB
        return
    }
    async updateOne (id, productInfo) {
        //PENDIENTE DE ACTUALIZAR CON LA DB
        return resultado
    }
    async deleteOne (id) {
        //PENDIENTE DE ACTUALIZAR CON LA DB
        return
    }
}

//export
module.exports = Contenedor;