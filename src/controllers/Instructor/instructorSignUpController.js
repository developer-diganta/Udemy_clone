const Instructor = require("../../models/instructor");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/*
Signs Up a new user, and if the user is already present/enters invalid email
returns an error Accepts data as per instructor schema and a token which is used
to verify email
*/

const instructorSignUp = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const email = decoded.email;
    const instructorObject = {
      email,
      ...req.body,
    };
    const instructor = new Instructor(instructorObject);

    await instructor.save();

    const token = await instructor.generateAuthToken();
    res.header("Authorization", `Bearer ${token}`);
    res.status(201).json({
      message: "Success",
      email: instructor.email,
      _id: instructor._id,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  instructorSignUp,
};
