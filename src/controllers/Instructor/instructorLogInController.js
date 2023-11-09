const Instructor = require("../../models/instructor");

/*
Logs In an existing user, and if the user is not present returns an error
Accepts email and password in the request body
*/

const instructorLogIn = async (req, res) => {
  try {
    const instructor = await Instructor.findByCredentials(
      req.body.email,
      req.body.password,
    );

    const token = await instructor.generateAuthToken();

    res.send({
      message: "Success",
      _id: instructor._id,
      email: instructor.email,
      token,
      name: instructor.name,
      type:"instructor"
    });
  } catch (error) {
    res.status(400).send(error.message );

  }
};

module.exports = {
  instructorLogIn,
};
