const assert = require('assert');
const otpGenerator = require('../src/utils/otpGenerator');

describe('otpGenerator function', () => {
  it('should generate a 6-digit OTP', () => {
    const email = 'example@example.com';
    const otp = otpGenerator(email);

    // Ensure the OTP generated is a string
    assert.strictEqual(typeof otp, 'string');

    // Ensure the OTP length is exactly 6 digits
    assert.strictEqual(otp.length, 6);

    // Ensure the OTP contains only numeric characters
    assert.ok(/^\d+$/.test(otp));
  });

  it('should generate different OTPs for different emails', () => {
    const email1 = 'email1@example.com';
    const email2 = 'email2@example.com';

    const otp1 = otpGenerator(email1);
    const otp2 = otpGenerator(email2);

    // Ensure OTPs for different emails are not equal
    assert.notStrictEqual(otp1, otp2);
  });
});