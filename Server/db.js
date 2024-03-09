const {Pool} = require("pg");

const client = new Pool({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "rootUser",
    database: "coldstorage",
})

module.exports = client;