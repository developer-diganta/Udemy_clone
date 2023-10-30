const Instructor = require("../../models/instructor");

const instructorProfileUpdate = async (req, res) => {
  try {
    const id = req.instructor._id;
    console.log("qqq", req.body.updates);
    const changed = await Instructor.findByIdAndUpdate(id, req.body.updates, { new: true });
    console.log(changed);
    res.status(201).send(changed)
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  instructorProfileUpdate,
};
