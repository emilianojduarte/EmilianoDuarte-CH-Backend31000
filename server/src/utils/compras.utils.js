//DECLARACIONES
const fs = require('fs');
//me traigo la base de productos para poder consultarla
const Contenedor = require('./contenedor.utils');
const baseProductos = new Contenedor();

//CLASE
class Compras{
    constructor(archivo){
        this.archivo = "dbCompras";
    }
    async createCart () {
        //creo un ID con nanoid
        const id = await import('nanoid').then(module =>{ return module.nanoid(5)});
        //leo el archivo y lo guardo en una variable
        let listadoCompras = JSON.parse(await fs.promises.readFile('./src/utils/dbCompras.json', 'utf-8'));
        //creo el nuevo carrito
        const nuevoCarrtio = {id: id, timestamp: new Date().toLocaleString("fr-FR"), productos: []};
        //pusheo el carrtito en el array
        listadoCompras.push(nuevoCarrtio);
        //y lo escribo
        await fs.promises.writeFile('./src/utils/dbCompras.json', JSON.stringify(listadoCompras));
        return id
    }
    async deleteOneCart (idCart) {
        let listadoCompras = JSON.parse(await fs.promises.readFile('./src/utils/dbCompras.json', 'utf-8'));
        const indiceEncontrado = listadoCompras.findIndex((carrito) => {
            return carrito.id === idCart;
        });
        let resultado = '';
        if (indiceEncontrado >= 0){
            //si existe, lo elimino del array con split
            listadoCompras.splice(indiceEncontrado, 1);
            await fs.promises.writeFile('./src/utils/dbCompras.json', JSON.stringify(listadoCompras));
            resultado = 'Producto eliminado';
        } else {
            resultado = 'Carrito no encontrado';
        }
        return resultado
    }
    async listProducts (idCart) {
        let listadoCompras = JSON.parse(await fs.promises.readFile('./src/utils/dbCompras.json', 'utf-8'));
        const indiceEncontrado = listadoCompras.findIndex((carrito) => {
            return carrito.id === idCart;
        });
        let resultado = '';
        if (indiceEncontrado >= 0){
            //si existe, lo asigno para devolverlo
            resultado = listadoCompras[indiceEncontrado].productos;
        } else {
            resultado = 'Carrito no encontrado';
        }
        return resultado
    }
    async addProductToCart (idCart, idProducto) {
        let listadoCompras = JSON.parse(await fs.promises.readFile('./src/utils/dbCompras.json', 'utf-8'));
        const indiceEncontrado = listadoCompras.findIndex((carrito) => {
            return carrito.id === idCart;
        });
        let resultado = '';
        if (indiceEncontrado >= 0){
            //si existe, compruebo la existe del producto con su id
            let productFromBase = await baseProductos.getById(idProducto.id);
            if (!!productFromBase && productFromBase != 'Producto no encontrado'){
                //si también existe, lo pusheo y guardo
                listadoCompras[indiceEncontrado].productos.push(productFromBase);
                await fs.promises.writeFile('./src/utils/dbCompras.json', JSON.stringify(listadoCompras));
                resultado = 'Producto agregado correctamente';
            } else {
                resultado = 'Carrito correcto, pero producto no existe';
            }
        } else {
            resultado = 'Carrito no encontrado';
        }
        return resultado
    }
    async deleteOneFromCart (idCart, idProducto) {
        let listadoCompras = JSON.parse(await fs.promises.readFile('./src/utils/dbCompras.json', 'utf-8'));
        const indiceEncontrado = listadoCompras.findIndex((carrito) => {
            return carrito.id === idCart;
        });
        let resultado = '';
        if (indiceEncontrado >= 0){
            const indiceEncontradoProducto = listadoCompras[indiceEncontrado].productos.findIndex((producto) => {
                return producto.id == idProducto;
            });
            if (indiceEncontradoProducto >= 0){
                //si también existe, lo elimino con split y guardo
                listadoCompras[indiceEncontrado].productos.splice(indiceEncontradoProducto, 1);
                await fs.promises.writeFile('./src/utils/dbCompras.json', JSON.stringify(listadoCompras));
                resultado = 'Producto eliminado del carrito correctamente';
            } else {
                resultado = 'Carrito correcto, pero producto no existe';
            }
        } else {
            resultado = 'Carrito no encontrado';
        }
        return resultado
    }
}

//export
module.exports = Compras;