const Instructor = require("../../models/instructor");
const logger = require("../../logger/logger")

const instructorLogout = async (req, res) => {
  const r = await Instructor.findByIdAndUpdate(req.instructor._id, {
    $pull: {
      tokens: { token: req.body.token },
    },
  });

  logger.logger.log("info","Instructor Logout")
  res.send({ message: "123" });
};

module.exports = {
  instructorLogout,
};
