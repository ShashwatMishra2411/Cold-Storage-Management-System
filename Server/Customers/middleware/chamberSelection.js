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
        console.log(err.message);
        return res.status(403).json({ message: "Invalid token" });
      } else {
        username = decoded;
      }
    });

    let messages = [];
    let sent = [];
    const selectedChambers = [];
    const users = await client.query(`SELECT username FROM customers`);
    let user_id = 0;
    users.rows.forEach((user, index) => {
      if (user.username === username.username) {
        user_id = index + 1;
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
    const commodity_id =
      (await client.query(`SELECT commodity_id FROM commodities`)).rows.length +
      1;

    for (const chamber of sent) {
      if (space === 0) break;
      let capacity = await client.query(
        `SELECT capacity FROM chambers WHERE chamber_id = $1`,
        [chamber.chamber_id]
      );
      capacity = capacity.rows[0].capacity;

      let filled = 0;
      console.log("filled = ", space);
      if (capacity < space) {
        space = space - capacity;
        filled = capacity;
        capacity = 0;
      } else {
        filled = space;
        capacity = capacity - space;
        space = 0;
      }
      console.log("filled = ", filled);
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

const viewChambers = async (req, res) => {
  try {
    // const chambers = await client.query(`SELECT * FROM chambers`);
    // res.json(chambers.rows);
    const token = req.headers["authorization"];
    jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      } else {
        const username = decoded.username;
        const users = await client.query(`SELECT username FROM customers`);
        let user_id = 0;
        users.rows.forEach((user, index) => {
          // console.log(user.username === username, index)
          if (user.username === username) {
            // console.log(index + 1)
            user_id = index + 1;
          }
        });
        // console.log(user_id)
        const selectedChambers = await client.query(
          `Select * from chambers where user_id = $1`,
          [user_id]
        );
        // console.log(selectedChambers.rows);
        res.json(selectedChambers.rows);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCommodities = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      } else {
        const username = decoded.username;
        const users = await client.query(`SELECT username FROM customers`);
        let user_id = 0;
        users.rows.forEach((user, index) => {
          // console.log(user.username === username, index)
          if (user.username === username) {
            // console.log(index + 1)
            user_id = index + 1;
          }
        });
        // console.log(user_id)
        const selectedChambers = await client.query(
          `Select * from chambers where user_id = $1`,
          [user_id]
        );
        console.log(selectedChambers.rows);
        let commodities = await Promise.all(
          selectedChambers.rows.map(async (chamber) => {
            console.log(chamber.chamber_id);
            let comms = await client.query(
              `SELECT * FROM commodities WHERE chamber_id = $1`,
              [chamber.chamber_id]
            );
            console.log("hey = ", comms.rows);

            return comms.rows;
          })
        );

        console.log("comms = ", commodities);
        res.json(commodities);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPurchases = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      } else {
        const username = decoded.username;
        const users = await client.query(`SELECT username FROM customers`);
        let user_id = 0;
        users.rows.forEach((user, index) => {
          // console.log(user.username === username, index)
          if (user.username === username) {
            // console.log(index + 1)
            user_id = index + 1;
          }
        });
        // console.log(user_id)
        const selectedChambers = await client.query(
          `Select * from chambers where user_id = $1`,
          [user_id]
        );
        console.log(selectedChambers.rows);
        let bill = 0;
        let commodities = await Promise.all(
          selectedChambers.rows.map(async (chamber) => {
            console.log(chamber.cost_per_unit);
            let comms = await client.query(
              `SELECT * FROM commodities WHERE chamber_id = $1`,
              [chamber.chamber_id]
            );
            // console.log("hey = ", comms.rows);
            comms.rows.forEach((commodity) => {
              bill = bill + commodity.amount * chamber.cost_per_unit;
              commodity.cost = commodity.amount * chamber.cost_per_unit;
            });
            return comms.rows;
          })
        );

        // console.log("comms = ", commodities);
        await client.query(
          `Update customers set bill_amt = $1 where username = $2`,
          [bill, username]
        );
        res.json(commodities);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  const token = req.headers["authorization"];
  jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      const username = decoded.username;
      const users = await client.query(`SELECT * FROM customers`);
      let user_id = 0;
      // users.rows.forEach((user, index) => {
      //   console.log(user.username, username, index)
      //   if (user.username === username) {
      //     console.log(index + 1);
      //     user_id = index + 1;
      //   }
      // });
      // console.log(user_id);
      const profile = await client.query(
        `SELECT * FROM customers WHERE username = $1`,
        [username]
      );
      // console.log(profile.rows);
      res.json(profile.rows);
    }
  });
};
module.exports = {
  getChambers,
  viewChambers,
  getCommodities,
  getPurchases,
  getProfile,
};
