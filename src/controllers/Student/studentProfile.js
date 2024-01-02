const Student = require("../../models/student");
const logger = require("../../logger/logger")

const studentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.query.id, {
      password: 0,
      tokens: 0,
    });
    logger.logger.log("info","Fetch Student Profile")
    res.status(200).send(student);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  studentProfile,
};
