const express = require("express");
const { getAllPayments } = require("../controllers/Payment/getAllPayments");
const router = express.Router();

router.post("/getpayments", getAllPayments);

module.exports = router;
