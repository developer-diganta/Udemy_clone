const request = require("supertest");
const app = require("../src/index");
const Instructor = require("../src/models/instructor");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const instructormock = {
  name: "John Doe",
  email:"test@test.com",
  password: "StrongPassword123!",
  bio: "I am a passionate instructor with expertise in various subjects.",
  profileImage: "https://example.com/profile-image.jpg",
  socialLinks: [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/johndoe/",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/johndoe/",
    },
  ],
};

describe("instructorSignUp", () => {
  afterAll(async () => {
    await Instructor.findOneAndDelete({ email: "test@test.com" });
  });

  it("should sign up an instructor and return a token", async () => {
    const response = await request(app)
      .post("/api/instructor")
      .send({ ...instructormock });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message: "Success",
      type: "instructor",
      email:"test@test.com",
      otpValidation:0
    });
  });

  it("should handle errors and return a 400 status", async () => {
    const response = await request(app)
      .post("/api/instructor")
      .send({ ...instructormock });

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe(
      '11000',
    );
  });
});
