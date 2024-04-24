const { Pool } = require("pg");

const client = new Pool({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "rootUser",
  database: "coldstorage",
});

const client1 = new Pool({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "rootUser",
  database: "coldstorage",
});

module.exports = {client, client1};
