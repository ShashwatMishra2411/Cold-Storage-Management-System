const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const chambers = require("../middleware/chamberSelection");
const client = require("../../db");
require("dotenv").config();

console.log(router);
router.post("/signup", auth.signup);

router.post("/login", auth.login);

router.get("/verifyJWT", auth.verifyJWT);

router.post("/items", chambers.getChambers);

router.get("/chambers", chambers.viewChambers);

router.get("/commodities", chambers.getCommodities);

router.get("/purchases", chambers.getPurchases);
module.exports = router;
