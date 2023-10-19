const studentCheckIfEnrolled = async (req, res) => {
  try {
    const id = req.body.courseId;
    const enrolled = !req.student.enrolled
      .map((course) => course.id)
      .includes(id);
    res.status(200).send({ enrolled });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  studentCheckIfEnrolled,
};
