const Student = require("../../models/student");

/*
Logs In an existing user, and if the user is not present returns an error
Accepts email and password in the request body
*/

const studentLogIn = async (req, res) => {
  try {
    const student = await Student.findByCredentials(
      req.body.email,
      req.body.password,
    );

    const token = await student.generateAuthToken();

    res.send({
      message: "Success",
      _id: student._id,
      email: student.email,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  studentLogIn,
};
