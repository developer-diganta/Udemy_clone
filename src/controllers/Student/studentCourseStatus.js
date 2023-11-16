const studentCourseStatus = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const section = parseInt(req.body.section);
    const videoNumber = parseInt(req.body.videoNumber);
    const courseIndex = await req.student.enrolled.findIndex(course => JSON.stringify(course.id) === JSON.stringify(courseId));
console.log(courseIndex)
    await req.student.enrolled[courseIndex].progress.push({ section, videoNumber });

   await req.student.save();
    // console.log(y);
    res.status(201).send({ message: "Updated" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  studentCourseStatus,
};
