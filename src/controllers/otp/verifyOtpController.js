const otpGenerator = require("../../utils/otpGenerator");
const Otp = require("../../models/otp");
const jwt = require("jsonwebtoken");

/*
Verifies OTP.
Accepts the otp and a token that contains the email against which OTP is to be validated.
*/

const verifyOtp = async (req, res) => {
  console.log("HERE");
  const { otp, token } = req.body;
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const email = decoded.email;
    const check = await Otp.verifyOTP(email, otp);
    if (check) {
      await Otp.deleteOTP(email);
    }
    res.send(check);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  verifyOtp,
};
