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

router.get("/courses", getCoursesController);
router.get("/courses/fuzzysearch", fuzzySearchController);
router.post("/courses/uploads", upload.single("file"), videoUploadController);
// router.post("/")

module.exports = router;
