const dbMaria = require('./dbMariaConnecion');

const createProductsTable = async () => {
    try {
        await dbMaria.schema.createTable('products', tableProducts => {
            tableProducts.increments('id').primary()
            tableProducts.string('timestamp', 30).notNullable()
            tableProducts.string('nombre', 30).notNullable()
            tableProducts.string('description', 200).notNullable()
            tableProducts.string('codigo', 6).notNullable()
            tableProducts.string('url', 300).notNullable()
            tableProducts.float('price', 20).notNullable()
            tableProducts.integer('stock', 6).notNullable()
        })
        dbMaria.destroy();
    } catch (error) {
        console.log("Ocurrio el siguiente error al crear la tabla: ", error);
        dbMaria.destroy();
    }
}

createProductsTable();