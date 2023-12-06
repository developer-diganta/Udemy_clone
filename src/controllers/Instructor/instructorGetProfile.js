const logger = require("../../logger/logger")

const instructorGetProfile = async (req, res) => {
  try {
    logger.logger.log("info","Get Instructor Profile")
    res.status(201).send({ instructor: req.instructor });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  instructorGetProfile,
};
