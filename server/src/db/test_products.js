const dbMaria = require('./dbMariaConnecion');
const id = 1;

async function getById (id) {
    try {
        let resultado;
        const busqueda = await dbMaria.from('products').where({id});
        if (busqueda != []){
            resultado = busqueda
        } else {
            resultado = "El producto no existe";
        }
        dbMaria.destroy();
        return resultado;
    } catch (error) {
        console.log(`Error al querer obtener el producto con ID: ${id}`);
        dbMaria.destroy();
    }
}

getById(id);