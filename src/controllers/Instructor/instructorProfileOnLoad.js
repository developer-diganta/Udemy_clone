const Instructor = require("../../models/instructor");

const instructorProfileOnLoad = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.query.id, {
      password: 0,
      tokens: 0,
    });
    res.status(200).send(instructor);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  instructorProfileOnLoad,
};