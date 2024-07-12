const express = require("express");
const { sendEmailcontrollers } = require("../Controllers/portfolioController");

const router = express.Router();

router.post("/sendEmail", sendEmailcontrollers);

module.exports = router;
