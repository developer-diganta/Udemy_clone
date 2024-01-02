const Instructor = require("../../models/instructor");
const logger = require("../../logger/logger")

const instructorProfile = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.body.id, {
      password: 0,
      tokens: 0,
    });
    logger.logger.log("info","Instructor Profile")
    res.status(200).send(instructor);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  instructorProfile,
};
