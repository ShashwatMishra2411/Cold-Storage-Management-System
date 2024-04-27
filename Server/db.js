const { Pool } = require("pg");
const fs = require("fs");
require('dotenv').config();
console.log(process.env.DB_PASSWORD)

const config = {
    user: "avnadmin",
    password: process.env.DB_PASSWORD,
    host: "pg-3f48a1f0-coldstorage-89cc.d.aivencloud.com",
    port: 14209,
    database: "coldstorage",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("ca.pem").toString(),
    },
};

const client = new Pool(config);
client.connect(function (err) {
    if (err)
        throw err;
        client.query("SELECT VERSION()", [], function (err, result) {
          if (err)
              throw err;
  
          console.log(result.rows[0].version);
      });
});
const client1 = new Pool(config);
client1.connect(function (err) {
    if (err)
        throw err;
        client1.query("SELECT VERSION()", [], function (err, result) {
          if (err)
              throw err;
  
          console.log(result.rows[0].version);
      });
});

module.exports = {client, client1};
