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
    async getById (id) {
        //Para encontrar el ID primero levanto lo que tengo en el archivo
        let listadoProductos = JSON.parse(await fs.promises.readFile(`./${this.archivo}.json`, 'utf-8'));
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
        let listadoProductos = JSON.parse(await fs.promises.readFile(`./${this.archivo}.json`, 'utf-8'));
        console.log("Listado traido de la promesa: ", listadoProductos);
        return listadoProductos;
    }
}
//express
const express = require('express');
const app = express();
const puerto = 8080;
//listado de productos
const productos = new Contenedor("productos");

//--------------------------------------------//
//APLICACION

app.get('/', (req, res) => {
    res.send('<h1 style="color: blue">Bienvenidos al server de Express</h1>');
})

app.get('/productos', (req, res) => {
    const listado = productos.getAll();
    res.send(`Listado completo de productos: ${listado}`);
})

app.get('/productoRandom', (req, res) => {
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    const resultado = productos.getById(getRndInteger(1,12));
    console.log("El numero aleatorio es: ", resultado)
    res.send(`Prodcuto aleatorio: ${resultado}`)
})

app.listen(puerto, (error) => {
    if(!error){
        console.log(`El servidor está escuchando el puerto: ${puerto}`)
    } else {
        console.log("Ocurrió el siguiente error al iniciar: ", error);
    }
})
