const client = require("../../db");

const getChambers = async (req, res) => {
  try {
    const { item, space, user_id } = req.body;
    const chambers = await client.query(`SELECT * FROM chambers `);
    const commodities = await client.query(`SELECT * FROM commodities`);
    let messages = [];
    let sent = [];
    const selectedChambers = [];

    for (const commodity of commodities.rows) {
      console.log(commodity.name, item, commodity.chamber_id, space);
      if (commodity.name.trim().toLowerCase() === item.trim().toLowerCase()) {
        console.log(commodity.name, item, commodity.chamber_id, space);
        const selected = await client.query(
          `SELECT * FROM chambers WHERE chamber_id = $1 AND capacity >= $2 AND (user_id = $3 OR user_id IS NULL)`,
          [commodity.chamber_id, space, user_id] // Pass parameters in the order they appear in the query
        );
        if (selected.rows.length > 0) selectedChambers.push(selected.rows);
      }
    }
    if (selectedChambers.length === 0) {
      messages.push(`No such item found: ${item}`);
      sent.push(chambers.rows.sort((a, b) => b.capacity - a.capacity));
    } else {
      messages.push(`Item found: ${item}`);
      sent.push(selectedChambers.sort((a, b) => b.capacity - a.capacity));
    }

    if (selectedChambers.length === 0) {
      res.json({ message: messages, chambers: sent });
    } else {
      res.json({ message: messages, chambers: sent });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getChambers };
