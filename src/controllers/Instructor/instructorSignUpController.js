const Instructor = require("../../models/instructor");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Handles the sign-up process for instructors. 
 * 
 * @param {*} req - The HTTP request object containing instructor sign-up data.
 * @param {*} res - The HTTP response object to send the response.
 */

const logger = require("../../logger/logger")

const instructorSignUp = async (req, res) => {
  try {

    const instructor = new Instructor(req.body);

    await instructor.save();
    logger.logger.log("info","Instructor Sign Up")
    res.status(201).json({
      message: "Success",
      type: "instructor",
      email: instructor.email,
      otpValidation: 0,
    });
  } catch (error) {
    console.log(error.code);
    res.status(400).send(JSON.stringify(error.code));
  }
};

module.exports = {
  instructorSignUp,
};
