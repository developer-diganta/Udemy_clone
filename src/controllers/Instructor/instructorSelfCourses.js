const Course = require("../../models/course");

const instructorSelfCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.body.id });
    console.log(req.body);
    res.status(201).send(courses);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

module.exports = {
  instructorSelfCourses,
};

