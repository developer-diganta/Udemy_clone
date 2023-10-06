const express = require("express");
const router = express.Router();

const {
  studentSignUp,
} = require("../controllers/Student/studentSignUpController");
const {
  studentLogIn,
} = require("../controllers/Student/studentLogInController");

router.post("/student", studentSignUp);
router.post("/student/login", studentLogIn);

module.exports = router;
