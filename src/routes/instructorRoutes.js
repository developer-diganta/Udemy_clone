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
const {
  instructorFetchSingleCourse,
} = require("../controllers/Instructor/instructorFetchSingleCourse");
const { getCourseVideo } = require("../controllers/Course/getCourseVideo");
const { deleteVideo } = require("../controllers/Course/videoDeletion");

router.post("/instructor", instructorSignUp);
router.post("/instructor/login", instructorLogIn);
router.post("/instructor/course/add", instructorCourseAddition);
router.post("/instructor/course/viewone", instructorFetchSingleCourse);
router.get("/instructor/videos/:filename", getCourseVideo);
router.post("/instructor/videos/delete", deleteVideo);

module.exports = router;
