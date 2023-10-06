const express = require("express");
const router = express.Router();

const SendOtpController = require("../controllers/otp/sendOtpController");
const {verifyOtp} = require("../controllers/otp/verifyOtpController");

router.post("/otp", SendOtpController.sendOtp);
router.post("/otp/verify", verifyOtp);

module.exports = router;
