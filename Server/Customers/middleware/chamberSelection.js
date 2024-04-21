const client = require("../../db");
const jwt = require("jsonwebtoken");

const getChambers = async (req, res) => {
  try {
    let { item, space, token, duration } = req.body;
    let username = "";
    const chambers = await client.query(`SELECT * FROM chambers `);
    const commodities = await client.query(`SELECT * FROM commodities`);

    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) {
        console.log(err.message)
        return res.status(403).json({ message: "Invalid token" });
      } else {
        username = decoded
      }
    });

    let messages = [];
    let sent = [];
    const selectedChambers = [];
    const users = await client.query(`SELECT username FROM customers`);
    let user_id = 0;
    users.rows.forEach((user, index)=>{
      if(user.username === username.username){
        user_id = index+1;
      }
    });

    for (const commodity of commodities.rows) {
      if (commodity.name.trim().toLowerCase() === item.trim().toLowerCase()) {
        const selected = await client.query(
          `SELECT * FROM chambers WHERE chamber_id = $1 AND capacity > 0 AND (user_id = $2 OR user_id IS NULL)`,
          [commodity.chamber_id, user_id]
        );
        if (selected.rows.length > 0) selectedChambers.push(selected.rows[0]);
      }
    }
    if (selectedChambers.length === 0) {
      messages.push(`No such item found: ${item}`);
      sent = chambers.rows.sort((a, b) => b.capacity - a.capacity);
    } else {
      messages.push(`Item found: ${item}`);
      sent = selectedChambers.sort((a, b) => b.capacity - a.capacity);
    }

    const temperature = Math.floor(Math.random() * (50 - 15 + 1)) + 15;
    const humidity = Math.floor(Math.random() * (90 - 50 + 1)) + 50;
    const commodity_id = (await client.query(`SELECT commodity_id FROM commodities`)).rows.length + 1;

    for (const chamber of sent) {
      if (space === 0) break;
      let capacity = await client.query(
        `SELECT capacity FROM chambers WHERE chamber_id = $1`,
        [chamber.chamber_id]
      );
      capacity = capacity.rows[0].capacity;

      let filled = 0;
      console.log("filled = ", space)
      if (capacity < space) {
        space = space - capacity;
        filled = capacity;
        capacity = 0;
      } else {
        filled = space;
        capacity = capacity - space;
        space = 0;
      }
      console.log("filled = ", filled)
      try {
        await client.query(
          `INSERT INTO commodities(commodity_id, name, temperature, humidity, chamber_id, amount) VALUES($1, $2, $3, $4, $5, $6)`,
          [
            commodity_id,
            item,
            temperature,
            humidity,
            chamber.chamber_id,
            filled,
          ]
        );
        let commodities = await client.query(
          `Select commodities from chambers where chamber_id = $1`,
          [chamber.chamber_id]
        );
        if (!commodities.rows[0].commodities.includes(item)) {
          commodities.rows[0].commodities.push(item);
        }
        await client.query(
          `UPDATE chambers SET capacity = $1, user_id = $2, commodities = $3 WHERE chamber_id = $4`,
          [
            capacity,
            user_id,
            commodities.rows[0].commodities,
            chamber.chamber_id,
          ]
        );
      } catch (err) {
        return res.json(err.message);
      }
    }

    res.json({ message: "Bill created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getChambers };