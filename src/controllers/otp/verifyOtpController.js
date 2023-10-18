const otpGenerator = require("../../utils/otpGenerator");
const Otp = require("../../models/otp");
const jwt = require("jsonwebtoken");
const Instructor = require("../../models/instructor");
const Student = require("../../models/student");

/*
Verifies OTP.
Accepts the otp and a token that contains the email against which OTP is to be validated.
*/

const verifyOtp = async (req, res) => {
  console.log("HERE", req.body);
  const { otp, email, type } = req.body;
  try {
    const check = await Otp.verifyOTP(email, otp);
    let token;
    if (check) {
      await Otp.deleteOTP(email);
      if (type === "instructor") {
        var instructor = await Instructor.findOne({ email: email });
        if (instructor.status === "pending") {
          instructor.status = "registered";
          await instructor.save();
          token = await instructor.generateAuthToken();
          res.header("Authorization", `Bearer ${token}`);
          res.send({ _id: instructor._id });
        }
      } else {
        var student = await Student.findOne({ email: email });
        if (student.status === "pending") {
          student.status = "registered";
          await student.save();
          token = await student.generateAuthToken();
          res.header("Authorization", `Bearer ${token}`);
          res.send({ _id: student._id });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  verifyOtp,
};
