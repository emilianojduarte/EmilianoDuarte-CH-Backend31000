//IMPORTS
import dbConfigUtils from "../utils/dbConfig.utils.js";
import mongoose from "mongoose";

//CONEXION
await mongoose.connect(dbConfigUtils.mongo.connectionString);

//CLASE
class ContenedorMongo {
    constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
    }

    async listarTodos () {
    const docs = await this.coleccion.find({}, { __v: 0 });
    return docs;
    }

    async listarUno (id) {
        const doc = await this.coleccion.findById(id, { __v: 0 });
        return doc;
    }

    async guardar (elemento) {
        elemento.timestamp = new Date().toLocaleString("fr-FR");
        const nuevoElemento = new this.coleccion(elemento);
        let nuevoElementoGuardado = await nuevoElemento.save();
        return(nuevoElementoGuardado);
    }

    async actualizar (id, elemento) {
        let resultado;
        await this.coleccion.findByIdAndUpdate(id, elemento, function (error, doc) {
            if (error){
                resultado = error;
            } else {
                resultado = doc;
            }
        }).clone();
        return resultado
    }

    async borrar ( id ) {
        let resultado;
        await this.coleccion.findByIdAndDelete(id,{},function (error, doc){
            if(error){
                resultado = error;
            } else {
                resultado = doc;
            }
        }).clone();
        return resultado;
    }
    
    async crearCarrito () {
        const nuevoCarrito = { timestamp: "", productos: []};
        let resultado = await this.guardar(nuevoCarrito);
        return resultado.id;
    }

    async guardarEnCarrito ( idCart, elemento) {
        let resultado;
        let tempCart = await this.listarUno(idCart);
        console.log("tempCart: ", tempCart);
        if ( tempCart ){
            tempCart.productos.push(elemento);
            console.log("tempCart despues del push", tempCart);
            this.actualizar(idCart, tempCart);
        } else {
            resultado = "El id de carrito no existe";
        }
        return resultado
    }
}

export default ContenedorMongo;
