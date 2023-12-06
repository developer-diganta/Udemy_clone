const Student = require("../../models/student");
const mongoose = require("mongoose");
const logger = require("../../logger/logger")

const studentEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.student._id;
    console.log({ studentId });
    const courses = await Student.aggregate([
      { $match: { _id: studentId } },
      {
        $lookup: {
          from: "courses",
          localField: "enrolled.id",
          foreignField: "_id",
          as: "enrolledCourses",
        },
      },
      {
        $project: {
          enrolledCourses: 1,
        },
      },
    ]);

    logger.logger.log("info","Student Enrolled Courses")

    res.status(201).send(courses[0].enrolledCourses);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  studentEnrolledCourses,
};
