const express = require('express');
const jwt = require('jsonwebtoken');
const client = require('../../db');
const router = express.Router();


router.post('/signup',async (req, res)=>{
    const {username, password} = req.body;
    console.log(client)
    await client.query(`SELECT * FROM customers WHERE username = ${username}`, (err, result)=>{
        if(err){
            console.log(err);
            res.json({message:err.message});
        }
        else{
            if(result.rows.length > 0){
                res.json({message: 'User already exists'});
            }
            else{
                client.query(`INSERT INTO customers (username, password, id) VALUES ('${username}', '${password}, ${result.rows.length+1}')`, (err, result)=>{
                    if(err){
                        console.log(err);
                        res.json({message:err.message});
                    }
                    else{
                        res.json({message: 'User created successfully'});
                    }
                })
            }
        }
    })
    res.send('Hello from userRoutes');
})


module.exports = router;