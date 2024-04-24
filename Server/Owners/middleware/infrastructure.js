const { client1 } = require("../../db");
const jwt = require("jsonwebtoken");
const getInfrastructure = async (req, res, next) => {
  await client1.query("SELECT * FROM infrastructure", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
};

const addInfrastructure = async (req, res, next) => {
  const { item, rate, quantity, uid } = req.body;
  console.log(item);
  const tot = rate * quantity;
  await client1.query(
    `INSERT INTO infrastructure (items, rate, quantity, uid, total) VALUES ('${item}', ${rate}, ${quantity}, ${uid}, ${tot})`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ message: "Machinery added successfully" });
      }
    }
  );
};

const getChambers = async (req, res) => {
  const token = req.headers["authorization"];
  jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      const username = decoded.username;
      const chambers = await client1.query(`SELECT * FROM chambers`);
      res.json(chambers.rows);
    }
  });
};

const getCustomers = async (req, res) => {
  const token = req.headers["authorization"];
  jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      const username = decoded.username;
      const customers = await client1.query(`SELECT * FROM customers`);
      res.json(customers.rows);
    }
  });
}

module.exports = { getInfrastructure, addInfrastructure, getChambers, getCustomers };
