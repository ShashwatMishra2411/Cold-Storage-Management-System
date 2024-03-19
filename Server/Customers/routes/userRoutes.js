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
  try {
    const { items, space } = req.body;
    const chambers = await client.query(`SELECT * FROM chambers `);
    const commodities = await client.query(`SELECT * FROM commodities`);
    console.log(items);
    console.log(space);
    let messages = [];
    let sent = [];
    const selectedChambers = [];

    for (const item of items) {
      for (const commodity of commodities.rows) {
        if ((commodity.name).trim().toLowerCase() === item.trim().toLowerCase()) {
          const selected = await client.query(`SELECT * FROM chambers WHERE chamber_id = '${commodity.chamber_id}'`);
          console.log(selected.rows);
          selectedChambers.push(selected.rows);
        }
      }
      if(selectedChambers.length === 0){
        messages.push(`No such item found: ${item}`);
        sent.push(chambers.rows.sort((a, b) => b.capacity - a.capacity))
      }else{
        messages.push(`Item found: ${item}`);
        sent.push(selectedChambers.sort((a, b) => b.capacity - a.capacity));
      }
    }

    console.log(selectedChambers.length, selectedChambers);

    if (selectedChambers.length === 0) {
      res.json({ message: messages, chambers: sent });
    } else {
      res.json({ message: messages, chambers: sent });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
