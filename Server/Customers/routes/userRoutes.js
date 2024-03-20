const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const chambers = require("../middleware/chamberSelection");
const client = require("../../db");
require("dotenv").config();

console.log(router);
router.post("/signup", auth.signup);

router.post("/login", auth.login);

router.get("/verifyJWT", auth.verifyJWT);

router.post("/items", chambers.getChambers);

router.post("/bill", async (req, res) => {
  try {
    const temperature = Math.floor(Math.random() * (50 - 15 + 1)) + 15;
    const humidity = Math.floor(Math.random() * (90 - 50 + 1)) + 50;
    const { item, space, chambers, duration, cost, user_id } = req.body;
    const commodity_id =
      (await client.query(`SELECT commodity_id FROM commodities`)).rows.length +
      1;
    for (const chamber of chambers) {
      let capacity = await client.query(
        `SELECT capacity FROM chambers WHERE chamber_id = $1`,
        [chamber]
      );
      console.log(capacity.rows);
      try {
        await client.query(
          `INSERT INTO commodities(commodity_id, name, temperature, humidity, chamber_id, amount) VALUES($1, $2, $3, $4, $5, $6)`,
          [commodity_id, item, temperature, humidity, chamber, space]
        );
        let commodities = await client.query(`Select commodities from chambers where chamber_id = $1`, [chamber])
        console.log(commodities.rows[0].commodities)
        if(!commodities.rows[0].commodities.includes(item)){
          commodities.rows[0].commodities.push(item);
        }
        await client.query(
          `UPDATE chambers SET capacity = $1, user_id = $2, commodities = $3 WHERE chamber_id = $4`,
          [capacity.rows[0].capacity - space, user_id, commodities.rows[0].commodities, chamber]
        );
      } catch (err) {
        res.json(err.message);
      }
    }

    res.json({ message: "Bill created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
