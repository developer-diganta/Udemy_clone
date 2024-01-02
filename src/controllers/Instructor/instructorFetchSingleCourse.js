const Course = require("../../models/course");
const Instructor = require("../../models/instructor");
const logger = require("../../logger/logger")

const instructorFetchSingleCourse = async (req, res) => {
  try {
    const instructorEmail = req.body.email;

    const courseId = req.body.courseId;
    const instructor = await Instructor.verifyAuthToken(
      req.body.token,
      instructorEmail,
    );
    const course = await Course.findOne({
      _id: courseId,
      instructor: instructor._id,
    });
    if (!course) {
      throw new Error("No Course Found");
    }
    logger.logger.log("info","Instructor Course Fetch")
    res.status(201).send({ course });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = { instructorFetchSingleCourse };
