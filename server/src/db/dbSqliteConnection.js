const knex = require('knex');

const configSQLite3 = {
    client: "sqlite3",
    connection: { filename: './src/db/ecommerce.sqlite' },
    useNullAsDefault: true
};

const dbSqliteConnection = knex(configSQLite3);

module.exports = dbSqliteConnection;