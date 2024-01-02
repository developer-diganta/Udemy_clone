const Course = require("../../models/course");
const logger = require("../../logger/logger")

const instructorSelfCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.body.id });
    logger.logger.log("info","Instructor Self Courses")
    res.status(201).send(courses);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

module.exports = {
  instructorSelfCourses,
};

