//DECLARACIONES (Se dejaron los console.log para que se pueda seguir en la consola lo que está ocurriendo)
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
        //Para encontrar el ID primero levanto lo que tengo en el archivo
        let listadoProductos = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
        //Uso un find para encontrar el id y lo guardo en una variable
        let encontrado = listadoProductos.find(producto => producto.id == id);
        let resultado;
        if (encontrado){
            //si existe lo paso al resultado
            resultado = encontrado;
        } else {
            //si no, es null
            resultado = null;
        }
        //y retorno el resultado
        console.log("El resultado es: ", resultado)
        return resultado
    }
    async getAll () {
        //leo el archivo y lo guardo en una variable que luego retorno
        let listadoProductos = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
        console.log("Listado de productos: ", listadoProductos);
        return listadoProductos;
    }
    async deleteByID (id) {
        //primero levanto lo que tengo
        let listadoProductos = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
        //utilizo un findindex para ubicarlo en el array
        const indiceEncontrado = listadoProductos.findIndex((producto) => {
            return producto.id === id;
        });
        let resultado = "";
        //si el resultado en -1 significa que no encontró nada
        if (indiceEncontrado===-1){
            resultado = "Producto no encontrado"
        } else {
            //y si lo encuentra lo elimino del array con un splice
            listadoProductos.splice(indiceEncontrado, 1);
            await fs.promises.writeFile(`./${this.archivo}.txt`, JSON.stringify(listadoProductos));
            resultado = "Producto eliminado con éxito"
        }
        //y retorno el resultado
        return resultado
    }
    async deleteAll () {
        //para borrar simplemente reescribo el archivo y le cargo unas llaves para marcarlo como vacío
        await fs.promises.writeFile(`./${this.archivo}.txt`, '{}');
        return "Borrado con exito"
    }
}

//APLICACION (descomentar según que se quiera probar)

//Instancia de clase
const test1 = new Contenedor("productos");

//Agrega un nuevo item
/*test1.save({
    title: "producto3",
    price: 56000,
    url: "http://url.deprueba.com"
});*/

//Traer un producto por el ID
//test1.getById(2);

//Listar todos los productos
//test1.getAll();

//Borrar 1 por el ID
//test1.deleteByID(2);

//Borrar todo
//console.log("Resultado: ", test1.deleteAll());