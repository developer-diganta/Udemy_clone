const Instructor = require("../../models/instructor");

const instructorProfileUpdate = async (req, res) => {
  try {
    const id = req.instructor._id;
    console.log(req.body.updates);
    const changed = await Instructor.findByIdAndUpdate(id, req.body.updates);
    console.log(changed);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  instructorProfileUpdate,
};
