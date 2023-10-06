const crypto = require("crypto");

/*
Generates a unique OTP using email and currenttimestamp using crypto library of
nodejs Accepts email
*/

function otpGenerator(email) {
  const timestamp = Date.now().toString();

  const data = email + timestamp;

  const hash = crypto.createHash("sha256").update(data).digest("hex");

  const otp = hash.substr(0, 6);

  return otp;
}

module.exports = otpGenerator;
