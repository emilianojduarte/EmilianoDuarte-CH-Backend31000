//DECLARACIONES
const fs = require('fs');

//CLASE
class Contenedor{
    constructor(archivo){
        this.archivo = "dbProductos";
    }
    async getById (id) {
        //Para encontrar el ID primero levanto lo que tengo en el archivo
        let listadoProductos = JSON.parse(await fs.promises.readFile('./src/utils/dbProductos.json', 'utf-8'));
        //Uso un find para encontrar el id y lo guardo en una variable
        let encontrado = listadoProductos.find(producto => producto.id == id);
        let resultado;
        if (encontrado){
            //si existe lo paso al resultado
            resultado = encontrado;
        } else {
            //si no, mensaje de no encontado
            resultado = 'Producto no encontrado';
        }
        //y retorno el resultado
        return resultado
    }
    async getAll () {
        //leo el archivo y lo guardo en una variable que luego retorno
        let listadoProductos = JSON.parse(await fs.promises.readFile('./src/utils/dbProductos.json', 'utf-8'));
        return listadoProductos;
    }
    async addOne (producto) {
        //le agrego el timestamp
        producto.timestamp = new Date().toLocaleString("fr-FR");
        let listadoProductos = JSON.parse(await fs.promises.readFile('./src/utils/dbProductos.json', 'utf-8'));
        //busco la última posicion, para ver su ID y sumarle 1, para que nunca se repitan
        let ultimo = listadoProductos.length -1;
        producto.id = listadoProductos[ultimo].id +1;
        //destructuro (lo hago para pasar solamente los datos que quiero, por ejemplo la variable de "si es admin" no la paso), hago el push al array y lo escribo
        const { id, timestamp, nombre, description, codigo, url, price, stock } = producto;
        listadoProductos.push({id, timestamp, nombre, description, codigo, url, price, stock });
        await fs.promises.writeFile('./src/utils/dbProductos.json', JSON.stringify(listadoProductos));
        return producto
    }
    async updateOne (id, productInfo) {
        let listadoProductos = JSON.parse(await fs.promises.readFile('./src/utils/dbProductos.json', 'utf-8'));
        //Uso un findindex para encontrar el producto
        const indiceEncontrado = listadoProductos.findIndex((producto) => {
            return producto.id == id;
        });
        let resultado;
        if (indiceEncontrado >= 0){
            //si existe, actualizo
            productInfo.timestamp = new Date().toLocaleString("fr-FR");
            const { id, timestamp, nombre, description, codigo, url, price, stock } = productInfo;
            listadoProductos[indiceEncontrado] = { id, timestamp, nombre, description, codigo, url, price, stock };
            await fs.promises.writeFile('./src/utils/dbProductos.json', JSON.stringify(listadoProductos));
            resultado = 'Producto actualizado';
        } else {
            //si no, mensaje de no encontado
            resultado = 'Producto no encontrado';
        }
        //y retorno el resultado
        return resultado
    }
    async deleteOne (id) {
        let listadoProductos = JSON.parse(await fs.promises.readFile('./src/utils/dbProductos.json', 'utf-8'));
        const indiceEncontrado = listadoProductos.findIndex((producto) => {
            return producto.id == id;
        });
        let resultado;
        if (indiceEncontrado >= 0){
            //si existe, lo elimino del array con split
            listadoProductos.splice(indiceEncontrado, 1);
            await fs.promises.writeFile('./src/utils/dbProductos.json', JSON.stringify(listadoProductos));
            resultado = 'Producto eliminado';
        } else {
            resultado = 'Producto no encontrado';
        }
        return resultado
    }
}

//export
module.exports = Contenedor;