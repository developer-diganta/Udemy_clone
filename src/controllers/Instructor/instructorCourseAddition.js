const Instructor = require("../../models/instructor");
const Course = require("../../models/course");

const instructorCourseAddition = async (req, res) => {
  try {
    const { _id, email, course } = req.body;
    const instructorCheck = await Instructor.validateAndGetInstructor(
      _id,
      email,
    );
    const newCourse = new Course(course);
    const courseSaveResponse = await newCourse.save();
    res.status(201).send({
      message: "Course Added",
      _id: courseSaveResponse._id,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  instructorCourseAddition,
};
