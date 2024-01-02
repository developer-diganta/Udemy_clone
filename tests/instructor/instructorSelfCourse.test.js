const request = require("supertest");
const app = require("../../src/index"); // Replace with the actual path to your app's entry point
const Course = require("../../src/models/course");
const Instructor = require("../../src/models/instructor");
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");

describe("Instructor API - Self Courses", () => {
  let instructor;
  let instructorToken;

  beforeAll(async () => {
    instructor = await Instructor.create(instructorMock);

    instructorToken = jwt.sign({ _id: instructor._id }, process.env.SECRET_KEY);

    await Instructor.updateOne(
      { _id: instructor._id },
      {
        $push: {
          tokens: { token: instructorToken }
        }
      }
    );

    const course1 = await Course.create({
      title: "Course 1",
      description: "Description for Course 1",
      price: 100.0,
      instructor: instructor._id,
      stripePriceId:"12345",
      stripeProductId:"12345",
    });

    const course2 = await Course.create({
      title: "Course 2",
      description: "Description for Course 2",
      price: 150.0,
      instructor: instructor._id,
      stripePriceId:"12346",
      stripeProductId:"12346",
    });
  });

  afterAll(async () => {
    await Instructor.findOneAndDelete({ email: instructorMock.email });
  });

  it("should return a list of courses created by the instructor", async () => {
    const response = await request(app)
      .post("/api/instructor/selfcourses")
      .send({
        id: instructor._id,
        token: instructorToken,
      });

    expect(response.status).toBe(201);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2); 
    const course1 = response.body[0];
    expect(course1).toHaveProperty("title", "Course 1");
    expect(course1).toHaveProperty("description", "Description for Course 1");

    const course2 = response.body[1];
    expect(course2).toHaveProperty("title", "Course 2");
    expect(course2).toHaveProperty("description", "Description for Course 2");
  });
});
