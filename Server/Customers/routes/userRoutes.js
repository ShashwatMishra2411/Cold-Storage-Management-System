const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const client = require("../../db");
require("dotenv").config();

console.log(router);
router.post("/signup", middleware.signup);

router.post("/login", middleware.login);

router.get("/verifyJWT", middleware.verifyJWT);

router.post("/items", async (req, res) => {
  const { items, space } = req.body;
  const chambers = await client.query(`SELECT * FROM chambers `);
  const commodities = await client.query(`SELECT * FROM commodities`);
  // console.log(commodities);
  // console.log(chambers);
  console.log(items);
  console.log(space);
  // res.json({chambers});
  const selectedChambers = [];
  items.forEach((item) => {
    commodities.rows.forEach(async (commodity) => {
      if (commodity.name === item) {
        selectedChambers.push(await client.query(`SELECT * FROM chambers WHERE chamber_id = ${commodity.chamber_id}`));
      }
    });
  });
  if (selectedChambers.length === 0) {
    res.json({ message: "No such item found", chambers: [chambers.rows] });
  }else{
    res.json({ message: "Items found", chambers: selectedChambers})
  }
});
module.exports = router;
