const Course = require("../../models/course");

const getSingleCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log("I AM HERE", courseId)
    const course = await Course.findById(courseId).populate({
      path: "instructor",
      select: ["name", "bio"],
    });
    console.log(course)
    res.status(201).send({ course });
  } catch (error) {
    res.status(201).send({ error: error.message });
  }
};

module.exports = {
  getSingleCourse,
};
