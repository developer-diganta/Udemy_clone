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
const { studentCourseStatus } = require("../controllers/Student/studentCourseStatus");
const { addQuestion } = require("../controllers/Course/addQuestion");
const { addAnswer } = require("../controllers/Course/addAnswer");
const { addRating } = require("../controllers/Course/addRating");

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

router.patch(
  "/student/statusupdate",
  studentAuthMiddleware,
  studentCourseStatus
)
router.patch("/student/course/question", studentAuthMiddleware, addQuestion)

router.patch("/student/course/question/answer", studentAuthMiddleware, addAnswer)

router.patch("/student/course/review", studentAuthMiddleware, addRating)

router.get("/student")

module.exports = router;
