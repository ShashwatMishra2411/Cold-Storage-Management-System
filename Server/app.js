const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "rootUser",
    database: "coldstorage",
})

client.connect();

client.query(`select * from users`,(err, res)=>{
    if(err) console.log(err.message);
    else console.log(res.rows);
    client.end;
})