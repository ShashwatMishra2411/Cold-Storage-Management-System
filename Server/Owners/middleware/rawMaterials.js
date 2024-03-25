const {rawMaterials} = require('../../db');

const getRawMaterials = async (req, res, next) => {
    await rawMaterials.query('SELECT * FROM rawMaterials', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result.rows)
            res.json(result.rows);
        }
    });
}

const addRawMaterials = async (req, res, next) => {
    const {item, rate, quantity, uid} = req.body;
    console.log(item)
    const tot = rate * quantity;
    await rawMaterials.query(`INSERT INTO rawMaterials (items, rate, quantity, uid, total) VALUES ('${item}', ${rate}, ${quantity}, ${uid}, ${tot})`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({message: 'Raw materials added successfully'});
        }
    });
}

module.exports = {getRawMaterials, addRawMaterials};