const Instructor = require("../../models/instructor");
const Course = require("../../models/course");

const instructorCourseAddition = async (req, res) => {
  try {
    const { _id, email, token, course } = req.body;
    // const instructorCheck = await Instructor.verifyAuthToken(token, email);
    // console.log(instructorCheck);
    const newCourse = new Course({ ...course, instructor: _id });
    const courseSaveResponse = await newCourse.save();
    res.status(201).send({
      message: "Course Added",
      _id: newCourse._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  instructorCourseAddition,
};
