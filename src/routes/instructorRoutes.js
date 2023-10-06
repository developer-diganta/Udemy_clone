const express = require("express");
const router = express.Router();

const {
  instructorSignUp,
} = require("../controllers/Instructor/instructorSignUpController");
const {
  instructorLogIn,
} = require("../controllers/Instructor/instructorLogInController");

router.post("/instructor", instructorSignUp);
router.post("/instructor/login", instructorLogIn);

module.exports = router;
