const express = require("express");
const { allStudents } = require("../controllers/Student/allStudents");
const { allInstructors } = require("../controllers/Instructor/allInstructors");
const { adminSignIn } = require("../controllers/Admin/adminSignIn");
const { getInstructorName } = require("../controllers/Admin/getInstructorName");
const { updateStatus } = require("../controllers/Course/updateStatus");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const { adminVerify } = require("../controllers/Admin/adminVerify");
const router = express.Router();

router.post("/admin/students",adminAuthMiddleware, allStudents);
router.post("/admin/instructors",adminAuthMiddleware, allInstructors);
router.post("/admin/verify",adminVerify)
router.post("/admin/signin", adminSignIn);
router.post("/admin/instructorname/:id",adminAuthMiddleware, getInstructorName);
router.patch("/admin/course/status",adminAuthMiddleware, updateStatus);
router.patch("/admin/verify",adminAuthMiddleware, adminVerify);

module.exports = router;
