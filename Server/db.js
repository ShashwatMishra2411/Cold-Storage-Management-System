const {Pool} = require("pg");

const client = new Pool({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "rootUser",
    database: "coldstorage",
})

const owner = new Pool({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "rootUser",
    database: "coldstorage",
})

const machinery = new Pool({
    host: "localhost",
    user: "postgres",
    port : "5432",
    password: "rootUser",
    database: "coldstorage",
})

const rawMaterials = new Pool({
    host: "localhost",
    user: "postgres",
    port : "5432",
    password: "rootUser",
    database: "coldstorage",
})

const infrastructure = new Pool({
    host: "localhost",
    user: "postgres",
    port : "5432",
    password: "rootUser",
    database: "coldstorage",
})

module.exports = {client, owner, machinery,rawMaterials, infrastructure};