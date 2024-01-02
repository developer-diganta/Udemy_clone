const Student = require("../../models/student");
const logger = require("../../logger/logger")

const allStudents = async (req, res) => {
  try {
    const students = await Student.find({}, { password: 0 });
    logger.logger.log("info","Studemt Retrieval")
    res.status(200).send(students);
  } catch (error) {
    logger.logger.log("error",error);
    res.status(400).send(error);
  }
};

module.exports = {
  allStudents,
};