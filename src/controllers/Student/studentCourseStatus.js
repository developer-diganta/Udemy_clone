
const logger = require("../../logger/logger")
const studentCourseStatus = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const section = parseInt(req.body.section);
    const videoNumber = parseInt(req.body.videoNumber);
    const courseIndex = await req.student.enrolled.findIndex(course => JSON.stringify(course.id) === JSON.stringify(courseId));
    await req.student.enrolled[courseIndex].progress.push({ section, videoNumber });

   await req.student.save();
   logger.logger.log("info","Update Course Status")
    res.status(201).send({ message: "Updated" });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  studentCourseStatus,
};
