const logger = require("../../logger/logger")

const studentCheckIfEnrolled = async (req, res) => {
  try {
    const id = req.body.courseId;
    const enrolledCourses = req.student.enrolled
    .map((course) => course.id)
    let enrolled = false;
    for(var i=0;i<enrolledCourses.length;i++){
      if(JSON.stringify(enrolledCourses[i])===JSON.stringify(id)){
        enrolled=true;
        break;
      }
    }
    logger.logger.log("info","Check Student Enrolled")
    res.status(200).send({ enrolled });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  studentCheckIfEnrolled,
};