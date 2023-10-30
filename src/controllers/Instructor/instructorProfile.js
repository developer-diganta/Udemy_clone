const Instructor = require("../../models/instructor");

const instructorProfile = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.query.id, {
      password: 0,
      tokens: 0,
    });
    console.log(instructor);
    res.status(200).send(instructor);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  instructorProfile,
};
