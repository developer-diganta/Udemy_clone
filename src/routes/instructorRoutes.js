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
const authMiddleware = require("../middleware/authMiddleware");
const { instructorSelfCourses } = require("../controllers/Instructor/instructorSelfCourses");
const { sectionAdd } = require("../controllers/Course/sectionAdd");

router.post("/instructor", instructorSignUp);
router.post("/instructor/login", instructorLogIn);
router.post("/instructor/course/add", authMiddleware, instructorCourseAddition);
router.post("/instructor/course/viewone",authMiddleware, instructorFetchSingleCourse);
router.get("/instructor/videos/:filename", getCourseVideo);
router.post("/instructor/videos/delete", authMiddleware, deleteVideo);
router.post("/instructor/selfcourses", authMiddleware, instructorSelfCourses)
router.post("/instructor/course/lesson/section/add", authMiddleware, sectionAdd)
module.exports = router;
