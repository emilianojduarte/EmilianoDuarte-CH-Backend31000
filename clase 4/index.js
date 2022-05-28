//DECLARACIONES
//fs
const fs = require('fs');
//clases
class Contenedor{
    //constructor
    constructor(archivo){
        this.archivo = archivo;
    }
    //métodos
    async save (product) {
        try{
            let listadoProductos = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
            //Busco el ID más alto para luego sumarle 1 y nunca repetir
            let tempID = 0;
            listadoProductos.forEach(elemento => {
                if(elemento.id > tempID){
                    tempID = elemento.id
                }
            });
            product.id = tempID + 1;
            listadoProductos.push(product);
            await fs.promises.writeFile(`./${this.archivo}.txt`, JSON.stringify(listadoProductos));
        } catch(error) {
            //En el catch creo el primero producto si no hay un archivo con productos ya existentes
            product.id = 1;
            let listadoProductos = [product];
            await fs.promises.writeFile(`./${this.archivo}.txt`, JSON.stringify(listadoProductos));
        }
    }
    async getById (id) {
        let listadoProductos = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
        let encontrado = listadoProductos.find(producto => producto.id == id);
        let resultado;
        if (encontrado){
            resultado = encontrado;
        } else {
            resultado = null;
        }
        return resultado
    }
    async getAll () {
        let listadoProductos = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
        return listadoProductos;
    }
    async deleteByID (id) {
        let listadoProductos = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
        const indiceEncontrado = listadoProductos.findIndex((producto) => {
            return producto.id === id;
        });
        let resultado = "";
        if (indiceEncontrado===-1){
            resultado = "Producto no encontrado"
        } else {
            listadoProductos.splice(indiceEncontrado, 1);
            await fs.promises.writeFile(`./${this.archivo}.txt`, JSON.stringify(listadoProductos));
            resultado = "Producto eliminado con éxito"
        }
        return resultado
    }
    async deleteAll () {
        await fs.promises.writeFile(`./${this.archivo}.txt`, '{}');
        return "Borrado con exito"
    }
}

//APLICACION (descomentar según que se quiera probar)

//Instancia de clase
const test1 = new Contenedor("productos");

//Agrega un nuevo item
/*test1.save({
    title: "procesador",
    price: 45000,
    url: "https://images.unsplash.com/photo-1601046885687-b7bdf1306274?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
});*/

//Traer un producto por el ID
//console.log("Producto: ", test1.getById(2));

//Listar todos los productos
//console.log("Listado de productos: ", test1.getAll());

//Borrar 1 por el ID
//console.log("Resultado: ", test1.deleteByID(2));

//Borrar todo
//console.log("Resultado: ", test1.deleteAll());