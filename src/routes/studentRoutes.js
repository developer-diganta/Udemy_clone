const express = require("express");
const router = express.Router();

const {
  studentSignUp,
} = require("../controllers/Student/studentSignUpController");
const {
  studentLogIn,
} = require("../controllers/Student/studentLogInController");
const {
  studentEnrolledCourses,
} = require("../controllers/Student/studentEnrolledCourses");
const studentAuthMiddleware = require("../middleware/studentAuthMiddleware");
const {
  studentCheckIfEnrolled,
} = require("../controllers/Student/studentCheckIfEnrolled");

router.post("/student", studentSignUp);
router.post("/student/login", studentLogIn);
router.post(
  "/student/enrolledcourses",
  studentAuthMiddleware,
  studentEnrolledCourses,
);
router.get(
  "/student/checkifenrolled",
  studentAuthMiddleware,
  studentCheckIfEnrolled,
);
module.exports = router;
