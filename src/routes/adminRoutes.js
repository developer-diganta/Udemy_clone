const express = require("express");
const { allStudents } = require("../controllers/Student/allStudents");
const { allInstructors } = require("../controllers/Instructor/allInstructors");
const router = express.Router();


router.get("/admin/students", allStudents)
router.get("/admin/instructors", allInstructors)

module.exports = router;
