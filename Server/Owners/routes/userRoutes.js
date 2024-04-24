const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { signup, login, verifyJWT } = require("../middleware/auth");
require("dotenv").config();
const { getMachinery, addMachinery } = require("../middleware/machinery");
const {
  getInfrastructure,
  addInfrastructure,
  getChambers,
} = require("../middleware/infrastructure");
const {
  getRawMaterials,
  addRawMaterials,
} = require("../middleware/rawMaterials");
const { getGrowth } = require("../middleware/updateGrowth");

router.post("/signup", signup);

router.post("/login", login);

router.get("/verifyJWT", verifyJWT);

router.get("/machinery", getMachinery);

router.post("/addMachinery", addMachinery);

router.post("/addInfrastructure", addInfrastructure);

router.get("/infrastructure", getInfrastructure);

router.get("/rawMaterials", getRawMaterials);

router.post("/addRawMaterials", addRawMaterials);

router.get("/growthupdate", getGrowth);

router.get("/chambers", getChambers);

// router.post('/signup',async (req, res)=>{
//     console.log(req.body);
//     console.log("hello");
//     const {username, password} = req.body;
//     await client.query("select * from owners", (err, result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(result.rows);
//         }
//     })
//     await client.query(`select * from owners where username = '${username}'`,(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(result.rows);
//             if(result.rows.length > 0){
//                 res.json({message: 'User already exists'});
//             }
//             else{
//                 client.query(`INSERT INTO owners (username, password) VALUES ( '${username}', '${password}')`, (err, result)=>{
//                     if(err){
//                         console.log(err);
//                         res.json({message:err.message});
//                     }
//                     else{
//                         res.json({message: 'User created successfully'});
//                     }
//                 })
//             }
//         }
//     }
//     )
// })

module.exports = router;
