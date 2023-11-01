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
const {
  instructorSelfCourses,
} = require("../controllers/Instructor/instructorSelfCourses");
const { sectionAdd } = require("../controllers/Course/sectionAdd");
const {
  instructorGetProfile,
} = require("../controllers/Instructor/instructorGetProfile");
const {
  instructorProfileUpdate,
} = require("../controllers/Instructor/instructorUpdateProfile");
const {
  instructorLogout,
} = require("../controllers/Instructor/instructorLogout");

const {
  instructorProfileOnLoad,
} = require("../controllers/Instructor/instructorProfileOnLoad");
const { sectionDeletion } = require("../controllers/Course/sectionDeletion");
const { instructorTokenVerify } = require("../controllers/Instructor/instructoTokenVerify");
const { publishCourse } = require("../controllers/Instructor/publishCourse");
const { verifyCourseOwnership } = require("../controllers/Instructor/verifyCourseOwnership");
const { instructorProfile } = require("../controllers/Instructor/instructorProfile");
const { getAllTeachers, getAllCourses } = require("../controllers/Instructor/getAllCourses");
const { editCourse } = require("../controllers/Course/editCourse");
const { coursePurchases } = require("../controllers/Course/coursePurchases");

router.post("/instructor", instructorSignUp);
router.post("/instructor/login", instructorLogIn);
router.post("/instructor/course/add", authMiddleware, instructorCourseAddition);
router.post(
  "/instructor/course/viewone",
  authMiddleware,
  instructorFetchSingleCourse,
);
router.get("/instructor/videos/:filename", getCourseVideo);
router.post("/instructor/videos/delete", authMiddleware, deleteVideo);
router.post("/instructor/selfcourses", authMiddleware, instructorSelfCourses);
router.post(
  "/instructor/course/lesson/section/add",
  authMiddleware,
  sectionAdd,
);
router.post("/instructor/profile", authMiddleware, instructorGetProfile);
router.patch(
  "/instructor/profile/update",
  authMiddleware,
  instructorProfileUpdate,
);
router.patch("/instructor/logout", authMiddleware, instructorLogout);
router.delete("/instructor/section/delete", authMiddleware, sectionDeletion);
router.post("/instructor/verify", authMiddleware, instructorTokenVerify)

router.patch("/instructor/status", authMiddleware, publishCourse)
router.post("/instructor/courseverify", authMiddleware, verifyCourseOwnership)
router.get("/instructor", instructorProfileOnLoad);
router.patch("/instructor/editcourse", authMiddleware, editCourse) 
router.post("/instructor/course/purchases", authMiddleware, coursePurchases)
module.exports = router;
