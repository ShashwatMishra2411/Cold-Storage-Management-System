const client = require("../../db");

const getChambers = async (req, res) => {
  try {
    let { item, space, user_id, duration } = req.body;
    const chambers = await client.query(`SELECT * FROM chambers `);
    const commodities = await client.query(`SELECT * FROM commodities`);
    let messages = [];
    let sent = [];
    const selectedChambers = [];

    for (const commodity of commodities.rows) {
      //   console.log(commodity.name, item, commodity.chamber_id, space);
      if (commodity.name.trim().toLowerCase() === item.trim().toLowerCase()) {
        // console.log(commodity.name, item, commodity.chamber_id, space);
        const selected = await client.query(
          `SELECT * FROM chambers WHERE chamber_id = $1 AND capacity > 0 AND (user_id = $2 OR user_id IS NULL)`,
          [commodity.chamber_id, user_id] // Pass parameters in the order they appear in the query
        );
        // console.log(selected.rows[0]);
        if (selected.rows.length > 0) selectedChambers.push(selected.rows[0]);
      }
    }
    if (selectedChambers.length === 0) {z
      messages.push(`No such item found: ${item}`);
      sent = chambers.rows.sort((a, b) => b.capacity - a.capacity);
    } else {
      messages.push(`Item found: ${item}`);
      //   console.log(selectedChambers);
      sent = selectedChambers.sort((a, b) => b.capacity - a.capacity);
    }
    // res.json({ message: messages, chambers: sent });
    // if (selectedChambers.length === 0) {
    //   res.json({ message: messages, chambers: sent });
    // } else {
    //   res.json({ message: messages, chambers: sent });
    // }
    try {
      const temperature = Math.floor(Math.random() * (50 - 15 + 1)) + 15;
      const humidity = Math.floor(Math.random() * (90 - 50 + 1)) + 50;
      //     // const { item, space, duration, cost, user_id } = req.body;
      const commodity_id =
        (await client.query(`SELECT commodity_id FROM commodities`)).rows
          .length + 1;
      console.log(commodity_id);
      for (const chamber of sent) {
        if (space === 0) break;
        let capacity = await client.query(
          `SELECT capacity FROM chambers WHERE chamber_id = $1`,
          [chamber.chamber_id]
        );
        capacity = capacity.rows[0].capacity;

        console.log(chamber.chamber_id);
        console.log("cap", capacity);
        let filled = 0;
        if (capacity < space) {
          space = space - capacity;
          filled = capacity;
          capacity = 0;
        } else {
          filled = space;
          capacity = capacity - space;
          space = 0;
        }

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
          console.log("com", commodities.rows[0].commodities);
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
        //   try{
        //     let assigned = [];
        //     console.log(assigned)
        //     assigned.push(chamber);
        //     console.log(assigned)
        //   }catch(err){
        //     console.log(err.message)
        //   }

          //   res.json
        } catch (err) {
          res.json(err.message);
        }
      }
    //   console.log(assigned);

      res.json({ message: "Bill created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    // res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getChambers };
