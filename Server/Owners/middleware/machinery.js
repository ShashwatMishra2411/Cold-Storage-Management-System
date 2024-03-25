const {machinery} = require('../../db');

const getMachinery = async (req, res, next) => {
    await machinery.query('SELECT * FROM machinery', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result.rows)
            res.json(result.rows);
        }
    });
}

const addMachinery = async (req, res, next) => {
    const {item, rate, quantity, uid} = req.body;
    console.log(item)
    const tot = rate * quantity;
    await machinery.query(`INSERT INTO machinery (items, rate, quantity, uid, total) VALUES ('${item}', ${rate}, ${quantity}, ${uid}, ${tot})`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({message: 'Machinery added successfully'});
        }
    });
}

module.exports = {getMachinery, addMachinery};