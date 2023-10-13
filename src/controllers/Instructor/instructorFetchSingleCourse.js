const Course = require("../../models/course");
const Instructor = require("../../models/instructor");

const instructorFetchSingleCourse = async (req, res) => {
  try {
    const instructorEmail = req.body.email;
    console.log("TOKEN:", req.body.token);
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
    console.log(course)
    res.status(201).send({ course });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = { instructorFetchSingleCourse };
