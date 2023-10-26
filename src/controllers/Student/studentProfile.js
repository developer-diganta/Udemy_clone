const Student = require("../../models/student");

const studentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.query.id, {
      password: 0,
      tokens: 0,
    });
    console.log(student);
    res.status(200).send(student);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  studentProfile,
};
