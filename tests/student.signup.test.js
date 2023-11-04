const request = require("supertest");
const app = require("../src/index");
const Student = require("../src/models/student");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const studentmock = {
  name: "John Doe",
  email: "test@test.com",
  password: "StrongP@ss123",
  enrolled: [
    {
      id: "60f1c5a2495ca62f98a80c56",
      progress: {
        completed: 30,
      },
    },
    {
      id: "60f1c5a2495ca62f98a80c57",
      progress: {
        completed: 15,
      },
    },
  ],
  wishlist: ["60f1c5a2495ca62f98a80c58", "60f1c5a2495ca62f98a80c59"],
  completed: [
    {
      courseId: "60f1c5a2495ca62f98a80c5a",
    },
    {
      courseId: "60f1c5a2495ca62f98a80c5b",
    },
  ],
};

const token = jwt.sign(
  {
    email: "test@test.com",
  },
  process.env.SECRET_KEY,
);

describe("studentSignUp", () => {
  afterAll(async () => {
    await Student.findOneAndDelete({ email: "test@test.com" });
  });

  it("should sign up a student and return a token", async () => {
    const response = await request(app)
      .post("/api/student")
      .send({ token, ...studentmock });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message: "Success",
      email: "test@test.com",
      otpValidation:0,
      type: "student",
    });
  });

  it("should handle errors and return a 400 status", async () => {
    const response = await request(app)
      .post("/api/student")
      .send({ ...studentmock, token: "Fake Token" });

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe(
      '{\"index\":0,\"code\":11000,\"keyPattern\":{\"email\":1},\"keyValue\":{\"email\":\"test@test.com\"}}',
    );
  });
});
