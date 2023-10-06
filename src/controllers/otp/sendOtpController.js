const otpGenerator = require("../../utils/otpGenerator");
const Otp = require("../../models/otp");
const jwt = require("jsonwebtoken");
const mailJet = require("../../utils/mailJet");

/*

Sends OTP. Also sends an email to the requester with the otp
Accepts email

*/
const sendOtp = async (req, res) => {
  const email = req.body.email;
  const generatedOtp = otpGenerator(email);
  const filter = { email };
  const update = { otp: generatedOtp };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const updatedOtp = await Otp.findOneAndUpdate(filter, update, options);
  mailJet(
    email,
    "Udemy Clone OTP for Login",
    "",
    `
  <p>Hello there!</p>

  <p>We appreciate your interest in joining Udemy Clone! To complete your registration, use the following One Time Password (OTP): <strong>801fb9</strong>.</p>

  <p>Please be advised that this OTP is valid for <strong>10 minutes</strong> only. For security reasons, avoid sharing this OTP with others.</p>

  <p>If you did not initiate this signup process, kindly ignore this email.</p>

  <p>Welcome aboard, and we look forward to having you as a valued member of Udemy Clone!</p>

  <p>Best Regards,<br>
    The Udemy Clone Team</p>
  `,
  );
  const emailToken = jwt.sign(
    {
      email,
    },
    process.env.SECRET_KEY,
  );

  res.status(200).send({ emailToken });
};

module.exports = {
  sendOtp,
};
