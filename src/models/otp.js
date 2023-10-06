/*
*****SCHEMA FOR OTP*****
otp: the otp
email: the email against which otp was requested,
expiresAt: expiration time set after 10 minutes
*/

const mongoose = require("mongoose");
const validator = require("validator");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

otpSchema.statics.verifyOTP = async function (email, otp) {
  const credentials = await Otp.findOne({ email });

  if (!credentials) {
    throw new Error("Invalid Email");
    return false;
  }

  if (credentials.otp !== otp) {
    throw new Error("Invalid OTP");
    return false;
  }

  return true;
};

otpSchema.statics.deleteOTP = async function (email) {
  try {
    const credentials = await Otp.findOneAndRemove({ email });
    return true;
  } catch (err) {
    return false;
  }
};

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
