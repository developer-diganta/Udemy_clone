const express = require("express");
const router = express.Router();

const {
  getCoursesController,
} = require("../controllers/Course/getCoursesController");

router.get("/courses", getCoursesController);

module.exports = router;
