const request = require("supertest");
const app = require("../src/index");
const Instructor = require("../src/models/instructor");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const instructormock = {
  name : "John Doe",
  token :
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTY1OTYxMTd9.ZycXOZQT_pLB2ieRG1oPAJxXkwIu4k5jWOhOL7_92qs",
  password : "StrongPassword123!",
  bio : "I am a passionate instructor with expertise in various subjects.",
  profileImage : "https://example.com/profile-image.jpg",
  socialLinks : [
    {
      name : "LinkedIn",
      link : "https://www.linkedin.com/in/johndoe/",
    },
    {
      name : "Twitter",
      link : "https://twitter.com/johndoe/",
    },
  ],
};

const token = jwt.sign(
    {
      email : "test@test.com",
    },
    process.env.SECRET_KEY,
);

describe("instructorSignUp", () => {
  afterAll(async () => {
    await Instructor.findOneAndDelete({email : "test@test.com"});
  });

  it("should sign up an instructor and return a token", async () => {
    const response = await request(app).post("/api/instructor").send({
      ...instructormock,
      token
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message : "Success",
      email : "test@test.com",
      _id : expect.any(String),
    });
  });

  it("should handle errors and return a 400 status", async () => {
    const response =
        await request(app).post("/api/instructor").send({...instructormock});

    expect(response.statusCode).toBe(400);
    expect(response.text)
        .toBe(
            '{"name":"JsonWebTokenError","message":"invalid signature"}',
        );
  });
});
