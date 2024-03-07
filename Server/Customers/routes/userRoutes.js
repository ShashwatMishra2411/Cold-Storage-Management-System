const express = require('express');
const jwt = require('jsonwebtoken');
const client = require('../../db');
const router = express.Router();
require('dotenv').config();

// console.log(process.env.PRIVATE_KEY);
router.post('/signup',async (req, res)=>{
    const {username, password} = req.body;
    await client.query(`SELECT * FROM customers WHERE username = '${username}'`, (err, result)=>{
            if(result.rows.length > 0){
                res.json({message: 'User already exists'});
            }
            else{
                client.query(`INSERT INTO customers VALUES ('${username}', '${password}')`, (err, result)=>{
                    if(err){
                        console.log(err);
                        res.json({message:err.message});
                    }
                    else{
                        res.json({message: 'User created successfully'});
                    }
                })
            }
    })
})

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;
    await client.query(`SELECT * FROM customers WHERE username = '${username}' AND password = '${password}'`, (err, result)=>{
        if(result.rows.length > 0){
            // console.log(process.env.PRIVATE_KEY)
            const token = jwt.sign({username: username}, process.env.PRIVATE_KEY, {expiresIn: '1h', algorithm: 'HS256'});
            res.json({message: 'Login successful', token: token});
        }
        else{
            res.json({message: 'Invalid username or password'});
        }
    })
})

router.get('/verifyJWT', (req, res)=>{
    const token = req.headers['authorization'];
    if(token){
        jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded)=>{
            if(err){
                res.json({message: 'Invalid token'});
            }
            else{
                res.json({message: 'Token is valid', decoded: decoded});
            }
        })
    }
    else{
        res.json({message: 'Token not provided'});
    }
})

module.exports = router;