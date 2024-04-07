const {owner} = require("../../db");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
    console.log(req.body);
    const {username, password, email, mobno} = req.body;
    await owner.query("select * from owners", (err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result.rows);
        }
    })
    await owner.query(`select * from owners where username = '${username}'`,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result.rows);
            if(result.rows.length > 0){
                res.json({message: 'User already exists'});
            }
            else{
                owner.query(`INSERT INTO owners (username, password, email, mobno) VALUES ( '${username}', '${password}', '${email}', ${mobno}`, (err, result)=>{
                    if(err){
                        console.log(err);
                        res.json({message:err.message});
                    }
                    else{
                        res.json({message: 'User created successfully'});
                    }
                })
            }
        }
    }
    )
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  await owner.query(
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

const verifyJWT = async (req,res)=>{
    const token = req.headers['authorization'];
    if(token){
        jwt.verify(token.process.env.PRIVATE_KEY, (err, decoded)=>{
            if(err){
                res.json({message: 'Invalid token'});
            }else{
                res.json({message: 'Token is valid', decoded: decoded});
            }
        }
        )
    }
}

module.exports = { signup, login, verifyJWT };
