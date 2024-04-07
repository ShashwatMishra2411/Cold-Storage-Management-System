const client = require('../../db');

const getInfrastructure = async (req, res, next) => {
    await client.query('SELECT * FROM infrastructure', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result.rows)
            res.json(result.rows);
        }
    });
}

const addInfrastructure = async (req, res, next) => {
    const {item, rate, quantity, uid} = req.body;
    console.log(item)
    const tot = rate * quantity;
    await client.query(`INSERT INTO infrastructure (items, rate, quantity, uid, total) VALUES ('${item}', ${rate}, ${quantity}, ${uid}, ${tot})`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({message: 'Machinery added successfully'});
        }
    });
}

module.exports = {getInfrastructure, addInfrastructure};