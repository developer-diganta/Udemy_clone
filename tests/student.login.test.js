const request = require("supertest");
const app = require("../src/index");
const Student = require("../src/models/student");
const jwt = require("jsonwebtoken");
const studentmock = {
  name : "John Doe",
  email : "test@test.com",
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

describe("studentlogin", () => {
  beforeAll(async () => { await Student.create(studentmock); });
  afterAll(async () => {
    await Student.findOneAndDelete({email : "test@test.com"});
  });
  it("should log in an existing instructor and return a token", async () => {
    const response = await request(app).post("/api/student/login").send({
      email : "test@test.com",
      password : "StrongPassword123!"
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message : "Success",
      _id : expect.any(String),
      email : "test@test.com",
      token : expect.any(String),
    });
  });
  it("returns appropriate error on non-existent login", async () => {
    const response = await request(app).post("/api/student/login").send({
      email : "test@test.com",
      password : "StrongPassword12223!"
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message : "Invalid Credentials",
    });
  });
});
