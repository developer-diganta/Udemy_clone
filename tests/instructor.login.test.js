const request = require("supertest");
const app = require("../src/index");
const Instructor = require("../src/models/instructor");
const jwt = require("jsonwebtoken");
const instructormock = {
  name: "John Doe",
  email: "test@test.com",
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

describe("intructorLogin", () => {
  beforeAll(async () => {
    await Instructor.create(instructormock);
  });
  afterAll(async () => {
    await Instructor.findOneAndDelete({ email: "test@test.com" });
  });
  it("should log in an existing instructor and return a token", async () => {
    const response = await request(app)
      .post("/api/instructor/login")
      .send({ email: "test@test.com", password: "StrongPassword123!" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Success",
      _id: expect.any(String),
      email: "test@test.com",
      token: expect.any(String),
      name:"John Doe",
      type:"instructor"
    });
  });
  it("returns appropriate error on non-existent login", async () => {
    const response = await request(app)
      .post("/api/instructor/login")
      .send({ email: "test@test.com", password: "StrongPassword12223!" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Unable to login",
    });
  });
});
