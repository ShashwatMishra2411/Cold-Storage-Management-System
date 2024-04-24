const { client1 } = require("../../db");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  console.log("hello")
  console.log(req.body);
  const { username, password} = req.body;
  console.log("username = ",username);
  console.log("password = ",password);
  // console.log(client1)
  await client1.query("Select * from owners", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.rows);
    }
  });
  await client1.query(
    `select * from owners where username = '${username}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.rows);
        if (result.rows.length > 0) {
          res.json({ message: "User already exists" });
        } else {
          client1.query(
            `INSERT INTO owners (username, password) VALUES ( '${username}', '${password}')`,
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
    }
  );
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  await client1.query(
    `SELECT * FROM owners WHERE username = '${username}' AND password = '${password}'`,
    (err, result) => {
      if (result.rows.length > 0) {
        const token = jwt.sign(
          { username: username },
          process.env.PRIVATE_KEY,
          { expiresIn: "1h", algorithm: "HS256" }
        );
        res.json({ message: "Login successful", token: token });
      } else {
        res.json({ message: "Invalid username or password" });
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
  }
};

module.exports = { signup, login, verifyJWT };
