const express = require("express");
const router = express.Router();
const { loginAdmin, seedAdmin } = require("../Controller/authController");

router.post("/login", loginAdmin);
router.post("/seed", seedAdmin);

module.exports = router;