const request = require("supertest");
const app = require("../src/index");
const Otp = require("../src/models/otp");

// Mocks
jest.mock("../src/utils/otpGenerator", () => {
  return jest.fn().mockReturnValue("123456");
});

jest.mock("../src/utils/mailJet", () => {
  return jest.fn();
});

const mocktoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTY1OTY5NTl9.wVu0D_A9vjIsIvBNKUB335hQ4EKj6FoNRkUiqoDO-BU";

// Test case
describe("sendOtp", () => {
  afterAll(async () => {
    await Otp.deleteMany({});
  });

  it("should send OTP and return email token", async () => {
    const response = await request(app)
      .post("/api/otp")
      .send({ email: "test@test.com" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("emailToken");
  });

  it("should send OTP and return email token", async () => {
    const response = await request(app).post("/api/otp/verify").send({
      otp: "123456",
      token: mocktoken,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(true);
  });
});
