const client = require("../../db");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    res.json({ message: "Username and password are required" });
  } else {
    await client.query(
      `SELECT * FROM customers WHERE username = '${username}'`,
      (err, result) => {
        if (result.rows.length > 0) {
          res.json({ message: "User already exists" });
        } else {
          client.query(
            `INSERT INTO customers VALUES ('${username}', '${password}')`,
            (err, result) => {
              if (err) {
                console.log(err);
                res.json({ message: err.message });
              } else {
                res.json({ message: "User created successfully" });
              }
            }
          );
        }
      }
    );
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body)
  await client.query(
    `SELECT * FROM customers WHERE username = '${username}' AND password = '${password}'`,
    (err, result) => {
      if (result.rows.length > 0) {
        // console.log(process.env.PRIVATE_KEY)
        const token = jwt.sign(
          { username: username },
          process.env.PRIVATE_KEY,
          { expiresIn: "1h", algorithm: "HS256" }
        );
        res.json({ message: "Login successful", token: token });
      } else {
        res.status(404).json({ message: "Invalid username or password" });
      }
    }
  );
};

const verifyJWT = async (req, res) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: "Invalid token" });
      } else {
        res.json({ message: "Token is valid", decoded: decoded });
      }
    });
  } else {
    res.json({ message: "Token not provided" });
  }
};
module.exports = { signup, login, verifyJWT};
