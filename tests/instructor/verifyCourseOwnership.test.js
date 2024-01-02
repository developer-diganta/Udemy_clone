const request = require("supertest");
const app = require("../../src/index"); 
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");
const Course = require("../../src/models/course");

describe("Course API - Verify Course Ownership", () => {
  let course;
  let instructor;
  let instructorToken;

  beforeAll(async () => {
    instructor = await Instructor.create(instructorMock);

    instructorToken = jwt.sign({ _id: instructor._id }, process.env.SECRET_KEY);

    course = await Course.create({
      title: "Test Course",
      description: "This is a test course.",
      price: 100.0,
      discount: 10,
      instructor: instructor._id,
      status: "published",
      stripePriceId: "12345",
      stripeProductId: "12345",
      lessons: [
        {
          title: "Lesson 1",
          videos: [
            {
              title: "Video 1",
              videoLink: "link1",
            },
            {
              title: "Video 2",
              videoLink: "link2",
            },
          ],
        },
        {
          title: "Lesson 2",
          videos: [
            {
              title: "Video 3",
              videoLink: "link3",
            },
          ],
        },
      ],
    });

    await Instructor.updateOne(
      { _id: instructor._id },
      {
        $push: {
          tokens: { token: instructorToken },
        },
      }
    );
  });

  afterAll(async () => {
    await Instructor.findOneAndDelete({ email: instructorMock.email });
    await Course.findOneAndDelete({ _id: course._id });
  });

  it("should verify course ownership for the instructor", async () => {
    const response = await request(app)
      .post("/api/instructor/courseverify")
      .send({
        courseId: course._id,
        id: instructor._id,
        token: instructorToken,
      });

    expect(response.status).toBe(201);
    expect(response.text).toBe("allowed");
  });

  it("should return 'not allowed' for an instructor without ownership", async () => {
    const otherInstructor = await Instructor.create({
      name: "Other Instructor",
      email: "other@example.com",
      password: "StrongPassword123!",
    });

    const otherInstructorToken = jwt.sign(
      { _id: otherInstructor._id },
      process.env.SECRET_KEY
    );
    await Instructor.updateOne(
        { _id: otherInstructor._id },
        {
          $push: {
            tokens: { token: otherInstructorToken },
          },
        }
      );
    const response = await request(app)
      .post("/api/instructor/courseverify")
      .send({
        courseId: course._id,
        _id: otherInstructor._id,
        token: otherInstructorToken,
      });

    expect(response.status).toBe(404);
    expect(response.text).toBe("not allowed");

    await Instructor.findOneAndDelete({ email: "other@example.com" });
  });
});
