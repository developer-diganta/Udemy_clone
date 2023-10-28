const express = require("express");
const { allStudents } = require("../controllers/Student/allStudents");
const { allInstructors } = require("../controllers/Instructor/allInstructors");
const { adminSignIn } = require("../controllers/Admin/adminSignIn");
const { getInstructorName } = require("../controllers/Admin/getInstructorName");
const { updateStatus } = require("../controllers/Course/updateStatus");
const router = express.Router();

router.get("/admin/students", allStudents);
router.get("/admin/instructors", allInstructors);
router.post("/admin/signin", adminSignIn);
router.get("/admin/instructorname/:id", getInstructorName);
router.patch("/admin/course/status", updateStatus);

module.exports = router;
