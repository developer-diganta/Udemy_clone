const Course = require("../../models/course");

const addQuestion = async (req, res) => {
  try {
    // console.log(req.student)
    const course = await Course.findById(req.body.courseId);
    const checkifenrolled = req.student.enrolled.filter(
      (course) =>
        JSON.stringify(course.id) === JSON.stringify(req.body.courseId),
    );
    if (checkifenrolled.length) {
      course.questionAnswers.push({
        title: req.body.title,
        description: req.body.description,
        askedBy: req.student._id,
        answers: [],
      });
    }
    await course.save();
    res.status(200).send({ course });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  addQuestion,
};
