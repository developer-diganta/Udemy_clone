const Student = require("../../models/student");
const jwt = require("jsonwebtoken");
const logger = require("../../logger/logger")

/*
Signs Up a new user, and if the user is already present/enters invalid email returns an error
Accepts data as per student schema and a token which is used to verify email
*/

const studentSignUp = async (req, res) => {
  try {
    const student = new Student(req.body);

    await student.save();
    logger.logger.log("info","New Student SignUp")

    res.status(201).json({
      message: "Success",
      email: student.email,
      otpValidation: 0,
      type: "student",
    });
  } catch (error) {
    console.log(error.code);
    res.status(400).send(JSON.stringify(error.code));
  }
};

module.exports = {
  studentSignUp,
};
