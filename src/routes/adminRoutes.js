const express = require("express");
const { allStudents } = require("../controllers/Student/allStudents");
const { allInstructors } = require("../controllers/Instructor/allInstructors");
const { adminSignIn } = require("../controllers/Admin/adminSignIn");
const router = express.Router();

router.get("/admin/students", allStudents);
router.get("/admin/instructors", allInstructors);
router.post("/admin/signin", adminSignIn);

module.exports = router;
