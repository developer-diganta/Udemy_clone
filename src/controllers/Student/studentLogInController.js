const Student = require("../../models/student");

/*
Logs In an existing user, and if the user is not present returns an error
Accepts email and password in the request body
*/

const logger = require("../../logger/logger")

const studentLogIn = async (req, res) => {
  try {
    const student = await Student.findByCredentials(
      req.body.email,
      req.body.password,
    );

    const token = await student.generateAuthToken();
    logger.logger.log("info","Successfull Login")
    res.send({
      message: "Success",
      _id: student._id,
      email: student.email,
      token,
      status:student.status,
      name:student.name,
      type:"student"
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  studentLogIn,
};
