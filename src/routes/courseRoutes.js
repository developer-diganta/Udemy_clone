const express = require("express");
const router = express.Router();

const {
  getCoursesController,
} = require("../controllers/Course/getCoursesController");
const {
  fuzzySearchController,
} = require("../controllers/Course/fuzzySearchController");

router.get("/courses", getCoursesController);
router.get("/courses/fuzzysearch", fuzzySearchController);

module.exports = router;
