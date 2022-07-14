const knex = require('knex')
const configMariaDB = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "productos"
    },
    pool: { min: 0, max: 7 },
}
const dbMariaConnection = knex(configMariaDB)

module.exports = dbMariaConnection;