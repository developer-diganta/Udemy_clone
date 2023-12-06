const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer");
const {
  videoUploadController,
} = require("../controllers/Course/videoUploadController");
const {
  getCoursesController,
} = require("../controllers/Course/getCoursesController");
const {
  fuzzySearchController,
} = require("../controllers/Course/fuzzySearchController");
const { getSingleCourse } = require("../controllers/Course/getSingleCourse");
const { getAllCourses } = require("../controllers/Course/getAllCourses");
const { codeRunner } = require("../controllers/Course/codeRunner");
const { getCategories } = require("../controllers/Course/getCategories");
const { getCourseForCategory } = require("../controllers/Course/getCourseForCategory");
const { execiseUpload } = require("../controllers/Course/exerciseUpload");

router.get("/course/:id", getSingleCourse);
router.get("/courses", getCoursesController);
router.get("/courses/all", getAllCourses);
router.get("/courses/fuzzysearch", fuzzySearchController);
router.post("/courses/uploads", upload.single("file"), videoUploadController);
router.get("/courses/categories", getCategories);
router.get("/courses/category", getCourseForCategory);
router.post("/courses/code", codeRunner);
router.post("/courses/exercise", execiseUpload);
// router.post("/")

module.exports = router;
