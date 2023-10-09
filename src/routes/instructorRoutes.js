const express = require("express");
const router = express.Router();

const {
  instructorSignUp,
} = require("../controllers/Instructor/instructorSignUpController");
const {
  instructorLogIn,
} = require("../controllers/Instructor/instructorLogInController");
const {
  instructorCourseAddition,
} = require("../controllers/Instructor/instructorCourseAddition");

router.post("/instructor", instructorSignUp);
router.post("/instructor/login", instructorLogIn);
router.post("/instructor/course/add", instructorCourseAddition);

module.exports = router;
