const express = require('express');
const jwt = require('jsonwebtoken');
const client = require('../../db');
const router = express.Router();


router.post('/signup',async (req, res)=>{
    console.log(req.body);
    console.log("hello");
    const {username, password} = req.body;
    await client.query("select * from owners", (err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result.rows);
        }
    })
    await client.query(`select * from owners where username = '${username}'`,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result.rows);
            if(result.rows.length > 0){
                res.json({message: 'User already exists'});
            }
            else{
                client.query(`INSERT INTO owners (username, password) VALUES ( '${username}', '${password}')`, (err, result)=>{
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
    }
    )

    // await client.query(`SELECT * FROM owners WHERE username = ${username}`, (err, result)=>{
    //     if(err){
    //         console.log(result)
    //         console.log("error")
    //         console.log(err);
    //         res.json({message:err.message});
    //     }
    //     else{
    //         if(result.rows.length > 0){
    //             res.json({message: 'User already exists'});
    //         }
    //         else{
    //             client.query(`INSERT INTO owners (username, password, id) VALUES ('${username}', '${password}, ${result.rows.length+1}')`, (err, result)=>{
    //                 if(err){
    //                     console.log(err);
    //                     res.json({message:err.message});
    //                 }
    //                 else{
    //                     res.json({message: 'User created successfully'});
    //                 }
    //             })
    //         }
    //     }
    // })
    res.send('Hello from userRoutes');
})


module.exports = router;