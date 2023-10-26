const Student = require("../../models/student");

const allStudents = async (req, res) => {
  try {
    const students = await Student.find({}, { password: 0 });
    res.status(200).send(students);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  allStudents,
};
