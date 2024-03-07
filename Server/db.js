const {Pool} = require("pg");

const client = new Pool({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "rootUser",
    database: "coldstorage",
})


client.query("select * from users", (err, result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(result.rows);
    }
})
module.exports = client;