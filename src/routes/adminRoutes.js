const express = require("express");
const { allStudents } = require("../controllers/Student/allStudents");
const { allInstructors } = require("../controllers/Instructor/allInstructors");
const { adminSignIn } = require("../controllers/Admin/adminSignIn");
const { getInstructorName } = require("../controllers/Admin/getInstructorName");
const { updateStatus } = require("../controllers/Course/updateStatus");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const router = express.Router();

router.post("/admin/students",adminAuthMiddleware, allStudents);
router.post("/admin/instructors",adminAuthMiddleware, allInstructors);
router.post("/admin/signin", adminSignIn);
router.post("/admin/instructorname/:id",adminAuthMiddleware, getInstructorName);
router.patch("/admin/course/status",adminAuthMiddleware, updateStatus);

module.exports = router;
